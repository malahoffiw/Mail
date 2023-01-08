import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import type { Editor } from "tinymce"
import { client, trpc } from "../../../utils/trpc"
import styles from "../../../styles"

import MessageEditor from "@/pages/newMessage/MessageEditor"

// todo - create a throttle or debounce function
const getUser = async (id: string) => {
    return await client.users.getUser.query(id)
}

const MessageForm = () => {
    const editorRef = useRef<Editor | null>(null)
    const [subject, setSubject] = useState("")
    const [recipient, setRecipient] = useState({
        name: "",
        id: "",
        exists: false,
    })
    const { mutate: createMessage, status } =
        trpc.messages.createMessage.useMutation()
    const router = useRouter()

    useEffect(() => {
        if (status === "success") {
            router.push("/")
        }

        // todo - handle other statuses
    }, [router, status])

    const submitRecipient = async () => {
        if (!recipient.exists) {
            const user = await getUser(recipient.name)
            if (!user) {
                setRecipient({ ...recipient, exists: false })
            } else {
                setRecipient({ ...recipient, id: user.id, exists: true })
            }
        }
    }

    // todo - add creating draft

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await submitRecipient()

        if (recipient.exists) {
            createMessage({
                subject,
                recipientId: recipient.id,
                body: editorRef.current?.getContent() || "",
            })
        } else {
            console.warn("recipient does not exist")
        }
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
            <label className="text-neutral-600 bg-neutral-100 pl-4 rounded grid grid-cols-[35px_1fr] items-center gap-2">
                Кому
                <input
                    className={`${
                        recipient.exists
                            ? "text-green italic"
                            : "text-neutral-900"
                    } min-w-120px outline-0 border-0 bg-neutral-100 p-4 py-1 rounded-r`}
                    type="text"
                    value={recipient.name}
                    onChange={(e) => {
                        setRecipient({
                            name: e.target.value.trim(),
                            id: "",
                            exists: false,
                        })
                    }}
                    onBlur={submitRecipient}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            submitRecipient()
                        }
                    }}
                />
            </label>
            <label className="text-neutral-600 bg-neutral-100 pl-4 rounded grid grid-cols-[35px_1fr] items-center gap-2">
                Тема
                <input
                    className={`min-w-120px bg-neutral-100 outline-0 border-0 text-neutral-900 p-4 py-1 rounded-r`}
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </label>
            <MessageEditor editorRef={editorRef} />
            <div className="self-end flex gap-2">
                <button
                    className={`${styles.btnSmallDarker} ${styles.transition} bg-ruby`}
                    type="button"
                >
                    Delete
                </button>
                <button
                    className={`${styles.btnSmallDarker} ${styles.transition} bg-green`}
                    type="submit"
                >
                    Send
                </button>
            </div>
        </form>
    )
}

export default MessageForm
