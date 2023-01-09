import React from "react"
import { BiUserCircle } from "react-icons/bi"
import dayjs from "dayjs"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../../types/message"
import styles from "../../../styles"

type MessageListProps = {
    messages: (InboxMessage | SentMessage | DraftMessage)[]
}

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <>
            {messages.map((message) => (
                <li
                    key={message.id}
                    className={`${styles.transition} ${styles.messageLine} grid grid-cols-[32px_minmax(140px,_1fr)_48px] gap-1 bg-neutral-800`}
                >
                    <BiUserCircle size={32} />
                    <div className="relative w-full">
                        <p>{message.subject}</p>
                        <p className="text-sm text-neutral-600">
                            {message.body}
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
