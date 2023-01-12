import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import type { User } from "next-auth"
import { HiOutlineUserCircle } from "react-icons/hi2"
import { TbTrash } from "react-icons/tb"
import dayjs from "dayjs"
import sanitizeHtml from "sanitize-html"
import { useAppDispatch } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import { assignMessage, openModal } from "../../../../store/reducers/modal"
import { selectDraft, setPending } from "../../../../store/reducers/drafts"
import { addToTrash } from "../../../../store/utils/deleteThunk"
import type { Message } from "../../../../types/message"
import styles from "../../../../styles"

import { ICON_SIZE_LARGE } from "@/Sidebar"

type MessageListProps = {
    messages: Message[]
    user: User
    currentPage: MessageType
}

const sanitize = (html: string) => {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {},
    })
}

const MessageList = ({ messages, user, currentPage }: MessageListProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const openDraft = (message: Message) => {
        dispatch(setPending(true))
        dispatch(selectDraft(message))
        router.push("/new")
    }

    const openMessageModal = (id: string) => {
        dispatch(assignMessage(id))
        dispatch(openModal())
    }

    const deleteMessage = (id: string) => {
        dispatch(addToTrash(id))
    }

    const getMessageImagePath = (message: Message) => {
        if (currentPage === "inbox") return message.author.image
        if (currentPage === "drafts" && message.recipient)
            return message.recipient.image
        if (currentPage === "sent" && message.recipient)
            return message.recipient.image

        // currentPage === "trash"
        if (message.authorId === user.id && message.recipientId === user.id)
            return message.author.image
        if (message.recipientId === user.id) return message.author.image
        return message.recipient?.image
    }

    const getMessageImage = (message: Message) => {
        const path = getMessageImagePath(message)

        if (!path) return <HiOutlineUserCircle size={ICON_SIZE_LARGE} />

        return (
            <Image
                src={path}
                alt="user image"
                width={ICON_SIZE_LARGE}
                height={ICON_SIZE_LARGE}
                className="rounded-full border-neutral-100 border-2"
            />
        )
    }

    return (
        <>
            {messages.map((message) => (
                <li
                    onClick={() => {
                        if (currentPage === "drafts") openDraft(message)
                        else openMessageModal(message.id)
                    }}
                    key={message.id}
                    className={`${styles.transition} ${styles.messageLine}`}
                >
                    <div>{getMessageImage(message)}</div>
                    <div className="relative w-full">
                        <p>{message.subject}</p>
                        <p className="text-sm text-neutral-600 break-words">
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
