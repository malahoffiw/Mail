import React from "react"
import { useRouter } from "next/router"
import type { User } from "next-auth"
import dayjs from "dayjs"
import sanitizeHtml from "sanitize-html"
import { TbTrash } from "react-icons/tb"
import { useAppDispatch } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import type { DeleteModalType } from "../../../../hooks/utils/useDeleteModal"
import { assignMessage, openModal } from "../../../../store/reducers/modal"
import { selectDraft, setPending } from "../../../../store/reducers/drafts"
import type { Message } from "../../../../types/message"
import styles from "../../../../styles"

import getMessageImage from "@/pages/utils/getMessageImagePath"

const sanitize = (html: string) => {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {},
    })
}

type MessageListProps = {
    messages: Message[]
    user: User
    currentPage: MessageType
    deleteModal: DeleteModalType
}

const MessageList = ({
    messages,
    user,
    currentPage,
    deleteModal,
}: MessageListProps) => {
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
                    <div>{getMessageImage(currentPage, user.id, message)}</div>
                    <div className="relative w-full">
                        <p>
                            {message.subject.length === 0 &&
                            message.body.length === 0
                                ? "{ Empty message }"
                                : message.subject}
                        </p>
                        <p className="text-sm text-neutral-600 break-words">
                            {sanitize(message.body)}
                        </p>
                    </div>
                    <div className="relative justify-self-end flex flex-col justify-between items-end">
                        <p className="text-sm text-neutral-600">
                            {dayjs(message.createdAt).format("DD/MM")}
                        </p>
                        <TbTrash
                            size={16}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (currentPage === "trash") {
                                    deleteModal.open(message.id)
                                } else {
                                    deleteModal.addMessageToTrash(message.id)
                                }
                            }}
                            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-neutral-600 sm:hover:text-neutral-100 sm:cursor-pointer"
                        />
                    </div>
                </li>
            ))}
        </>
    )
}

export default MessageList
