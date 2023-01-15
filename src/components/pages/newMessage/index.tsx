import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Error from "next/error"
import type { Editor } from "tinymce"
import useBeforePageLeave from "../../../hooks/router/useBeforePageLeave"
import useNewMessageMutation from "../../../hooks/mutations/useNewMessageMutation"
import useDraftMutation from "../../../hooks/mutations/useDraftMutation"
import useMessageFormInitialize from "../../../hooks/store/useMessageFormInitialize"

import type { Recipient } from "./Form/utils/submitMessageRecipient"
import submitMessageRecipient from "./Form/utils/submitMessageRecipient"
import MessageEditor from "@/pages/newMessage/Editor/MessageEditor"
import FormFooter from "@/pages/newMessage/Form/FormFooter"
import {
    isCreated,
    isMessageOrDraftInProcess,
    isMessageOrDraftThrowingError,
} from "@/pages/newMessage/Form/utils/checkMutationStatuses"
import FormSubjectInput from "@/pages/newMessage/Form/FormSubjectInput"
import FormRecipientInput from "@/pages/newMessage/Form/FormRecipientInput"
import Loader from "@/Loader"

const MessageForm = () => {
    const router = useRouter()
    const initialFormContent = useMessageFormInitialize()

    const editorRef = useRef<Editor | null>(null)
    const [subject, setSubject] = useState(initialFormContent.subject)
    const [recipient, setRecipient] = useState<Recipient>(initialFormContent.recipient)

    const { updateDraftIntoNewMessage, createMessage, getMessageStatus } = useNewMessageMutation()
    const { createDraft, updateDraft, getDraftStatus } = useDraftMutation()

    useEffect(() => {
        if (isCreated(getMessageStatus())) {
            router.push("/")
        }
    }, [getMessageStatus, router])

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
        if (isCreated(getMessageStatus())) {
            return
        }
        if (!isFormEmpty()) {
            await submitMessageRecipient(recipient, setRecipient)
            if (initialFormContent.draftId) {
                await updateDraft(
                    initialFormContent.draftId,
                    recipient.id,
                    subject,
                    editorRef.current?.getContent() ?? ""
                )
            } else {
                await createDraft(recipient.id, subject, editorRef.current?.getContent() || "")
            }
        }
        return
    }, [
        getMessageStatus,
        isFormEmpty,
        recipient,
        initialFormContent.draftId,
        updateDraft,
        subject,
        createDraft,
    ])

    useBeforePageLeave(handleWindowCloseOrBrowseAway)
    /** -------------------------------------------------------------- */

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await submitMessageRecipient(recipient, setRecipient)

        if (recipient.exists) {
            if (initialFormContent.draftId) {
                await updateDraftIntoNewMessage(
                    initialFormContent.draftId,
                    recipient.id,
                    subject,
                    editorRef.current?.getContent() || ""
                )
            } else {
                await createMessage(recipient.id, subject, editorRef.current?.getContent() || "")
            }
        } else {
            // todo - handle this beautifully
            console.warn("recipient does not exist")
        }
    }

    if (isMessageOrDraftInProcess(getMessageStatus(), getDraftStatus())) {
        return <Loader />
    }

    if (isMessageOrDraftThrowingError(getMessageStatus(), getDraftStatus())) {
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
            <FormRecipientInput recipient={recipient} setRecipient={setRecipient} />
            <FormSubjectInput subject={subject} setSubject={setSubject} />
            <MessageEditor editorRef={editorRef} initialContent={initialFormContent.body} />
            <FormFooter />
        </form>
    )
}

export default MessageForm
