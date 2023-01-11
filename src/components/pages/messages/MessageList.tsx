import React from "react"
import { BiUserCircle } from "react-icons/bi"
import dayjs from "dayjs"
import sanitizeHtml from "sanitize-html"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../../types/message"
import { useAppDispatch } from "../../../hooks/redux"
import { assignMessage, openModal } from "../../../store/reducers/modal"
import styles from "../../../styles"

type MessageListProps = {
    messages: (InboxMessage | SentMessage | DraftMessage)[]
}

const sanitize = (html: string) => {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {},
    })
}

const MessageList = ({ messages }: MessageListProps) => {
    const dispatch = useAppDispatch()

    const openMessageModal = (id: string) => {
        dispatch(assignMessage(id))
        dispatch(openModal())
    }

    return (
        <>
            {messages.map((message) => (
                <li
                    onClick={() => {
                        openMessageModal(message.id)
                    }}
                    key={message.id}
                    className={`${styles.transition} ${styles.messageLine} grid grid-cols-[32px_minmax(140px,_1fr)_48px] gap-1 bg-neutral-800`}
                >
                    <BiUserCircle size={32} />
                    <div className="relative w-full">
                        <p>{message.subject}</p>
                        <p className="text-sm text-neutral-600">
                            {sanitize(message.body)}
                        </p>
                    </div>
                    <div className="justify-self-end">
                        <p className="text-sm text-neutral-600">
                            {dayjs(message.createdAt).format("DD/MM")}
                        </p>
                    </div>
                </li>
            ))}
        </>
    )
}

export default MessageList
