import React from "react"
import { BiUserCircle } from "react-icons/bi"
import dayjs from "dayjs"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../types/message"

type MessageListProps = {
    messages: (InboxMessage | SentMessage | DraftMessage)[]
}

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className="flex p-1 px-2 gap-1 h-fit min-w-full bg-neutral-800 rounded hover:bg-neutral-700 cursor-pointer"
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
