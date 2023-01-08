import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Error from "next/error"
import type { Editor } from "tinymce"
import useBeforePageLeave from "../../../hooks/router/useBeforePageLeave"
import useNewMessageMutation from "../../../hooks/mutations/useNewMessageMutation"
import useNewDraftMutation from "../../../hooks/mutations/useNewDraftMutation"

import type { Recipient } from "./Form/utils/submitMessageRecipient"
import submitMessageRecipient from "./Form/utils/submitMessageRecipient"
import MessageEditor from "@/pages/newMessage/Editor/MessageEditor"
import FormFooter from "@/pages/newMessage/Form/FormFooter"
import {
    isMessageOrDraftCreated,
    isMessageOrDraftInProcess,
    isMessageOrDraftThrowingError,
} from "@/pages/newMessage/Form/utils/checkMutationStatuses"
import FormSubjectInput from "@/pages/newMessage/Form/FormSubjectInput"
import FormRecipientInput from "@/pages/newMessage/Form/FormRecipientInput"

const MessageForm = () => {
    const router = useRouter()
    const editorRef = useRef<Editor | null>(null)
    const [subject, setSubject] = useState("")
    const [recipient, setRecipient] = useState<Recipient>({
        name: "",
        id: "",
        exists: false,
    })

    const { messageStatus, createMessage } = useNewMessageMutation()
    const { draftStatus, createDraft } = useNewDraftMutation()

    useEffect(() => {
        if (isMessageOrDraftCreated(messageStatus, draftStatus)) {
            router.push("/")
        }
    }, [draftStatus, messageStatus, router])

    /** --------------------------------------------------------------
     * This part is important for preventing data loss on page leave
     */
    const isFormEmpty = useCallback(() => {
        return (
            !recipient.exists &&
            subject.length === 0 &&
            editorRef.current?.getContent().length === 0
        )
    }, [recipient.exists, subject.length])

    const handleWindowCloseOrBrowseAway = useCallback(async () => {
        if (isMessageOrDraftCreated(messageStatus, draftStatus)) return
        if (!isFormEmpty()) {
            await submitMessageRecipient(recipient, setRecipient)
            await createDraft(
                recipient.id,
                subject,
                editorRef.current?.getContent() || ""
            )
        }
        return
    }, [
        messageStatus,
        draftStatus,
        isFormEmpty,
        recipient,
        createDraft,
        subject,
    ])

    useBeforePageLeave(handleWindowCloseOrBrowseAway)
    /** -------------------------------------------------------------- */

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await submitMessageRecipient(recipient, setRecipient)

        if (recipient.exists) {
            await createMessage(
                recipient.id,
                subject,
                editorRef.current?.getContent() || ""
            )
        } else {
            // todo - handle this beautifully
            console.warn("recipient does not exist")
        }
    }

    if (isMessageOrDraftInProcess(messageStatus, draftStatus)) {
        // todo - create Loading component
        return <div>Loading...</div>
    }

    if (isMessageOrDraftThrowingError(messageStatus, draftStatus)) {
        return <Error statusCode={500} />
    }

    return (
        <form
            onSubmit={submitForm}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                }
            }}
            className="flex flex-col gap-2"
        >
            <FormRecipientInput
                recipient={recipient}
                setRecipient={setRecipient}
            />
            <FormSubjectInput subject={subject} setSubject={setSubject} />
            <MessageEditor editorRef={editorRef} />
            <FormFooter />
        </form>
    )
}

export default MessageForm
