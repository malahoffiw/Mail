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
                    className="transition-full group grid grid-cols-[40px_minmax(140px,_1fr)_48px] gap-1 min-h-[48px] bg-neutral-800 p-1 rounded cursor-pointer hover:brightness-125"
                >
                    <div>{getMessageImage(currentPage, user.id, message)}</div>
                    <div className="relative w-full">
                        <p>
                            {message.subject.length === 0 &&
                            message.body.length === 0
                                ? "{ Empty message }"
                                : message.subject}
                        </p>
                        <p className="break-words text-sm text-neutral-600">
                            {sanitize(message.body)}
                        </p>
                    </div>
                    <div className="relative flex flex-col items-end justify-between justify-self-end">
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
                            className="text-neutral-600 opacity-100 sm:group-hover:opacity-100 sm:hover:text-neutral-100 sm:cursor-pointer sm:opacity-0"
                        />
                    </div>
                </li>
            ))}
        </>
    )
}

export default MessageList
