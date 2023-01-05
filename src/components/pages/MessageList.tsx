import React from "react"
import { BiUserCircle } from "react-icons/bi"
import dayjs from "dayjs"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../types/message"
import styles from "../../styles"

type MessageListProps = {
    messages: (InboxMessage | SentMessage | DraftMessage)[]
}

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`${styles.transition} ${styles.btnSmall} flex gap-1 h-fit min-w-full bg-neutral-800 hover:brightness-125 p-2 py-1 rounded cursor-pointer`}
                >
                    <BiUserCircle size={32} />
                    <div className="relative w-full">
                        <p>{message.subject}</p>
                        <p className="text-sm text-neutral-600">
                            {message.body}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-neutral-600">
                            {dayjs(message.createdAt).format("DD/MM")}
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MessageList
