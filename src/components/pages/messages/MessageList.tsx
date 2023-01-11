import React from "react"
import { BiUserCircle } from "react-icons/bi"
import { TbTrash } from "react-icons/tb"
import dayjs from "dayjs"
import sanitizeHtml from "sanitize-html"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../../types/message"
import { useAppDispatch } from "../../../hooks/redux"
import { assignMessage, openModal } from "../../../store/reducers/modal"
import { addToTrash } from "../../../store/utils/deleteThunk"
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

    const deleteMessage = (id: string) => {
        dispatch(addToTrash(id))
    }

    return (
        <>
            {messages.map((message) => (
                <li
                    onClick={() => {
                        openMessageModal(message.id)
                    }}
                    key={message.id}
                    className={`${styles.transition} ${styles.messageLine}`}
                >
                    <BiUserCircle size={32} />
                    <div className="relative w-full">
                        <p>{message.subject}</p>
                        <p className="text-sm text-neutral-600">
                            {sanitize(message.body)}
                        </p>
                    </div>
                    <div className="justify-self-end flex flex-col justify-between items-end">
                        <p className="text-sm text-neutral-600">
                            {dayjs(message.createdAt).format("DD/MM")}
                        </p>
                        <TbTrash
                            size={16}
                            onClick={(e) => {
                                e.stopPropagation()
                                deleteMessage(message.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-neutral-100 cursor-pointer"
                        />
                    </div>
                </li>
            ))}
        </>
    )
}

export default MessageList
