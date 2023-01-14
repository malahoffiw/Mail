import React from "react"
import type { User } from "next-auth"
import dayjs from "dayjs"
import parse from "html-react-parser"
import type { Message } from "../../../../types/message"

type MessageBodyProps = {
    message: Message
    user: User
}

const ModalBody = ({ message, user }: MessageBodyProps) => {
    return (
        <div className="flex flex-col items-center gap-2 p-4 text-neutral-900">
            <label className="bg-neutral-100 text-neutral-600 px-4 py-1 w-full rounded grid grid-cols-[80px_1fr]">
                Author
                {message.authorId !== user.id ? (
                    <p className="text-neutral-900">{message.author.name}</p>
                ) : (
                    <p className="text-neutral-900">Me</p>
                )}
            </label>
            <label className="bg-neutral-100 text-neutral-600 px-4 py-1 w-full rounded grid grid-cols-[80px_1fr]">
                Recipient
                {message.recipientId !== user.id ? (
                    <p className="text-neutral-900">
                        {message.recipient?.name}
                    </p>
                ) : (
                    <p className="text-neutral-900">Me</p>
                )}
            </label>
            <label className="bg-neutral-100 text-neutral-600 px-4 py-1 w-full rounded grid grid-cols-[80px_1fr]">
                Subject
                <p className="text-neutral-900">{message.subject}</p>
            </label>
            <div className="min-h-[100px] relative w-full bg-neutral-100 rounded pl-4 pr-20 py-2">
                <p className="absolute top-2 right-2 text-sm text-neutral-600">
                    {dayjs(message.createdAt).format("DD/MM HH:mm")}
                </p>
                {parse(message.body)}
            </div>
        </div>
    )
}

export default ModalBody
