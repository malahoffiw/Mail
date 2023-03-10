import React, { useState } from "react"
import { useRouter } from "next/router"
import type { User } from "next-auth"
import dayjs from "dayjs"
import { TbTrash } from "react-icons/tb"
import { useAppDispatch } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import type { DeleteModalType } from "../../../../hooks/utils/useDeleteModal"
import { assignMessage, openModal } from "../../../../store/reducers/modal"
import { selectDraft, setPending } from "../../../../store/reducers/drafts"
import type { Message } from "../../../../types/message"

import { ICON_SIZE_SMALL } from "@/sidebar"
import getMessageImage from "@/pages/utils/getMessageImagePath"
import MessageLineBody from "@/pages/messages/MessageList/MessageLineBody"
import MessageLineStar from "@/pages/messages/MessageList/MessageLineStar"
import MessageLineCheckbox from "@/pages/messages/MessageList/MessageLineCheckbox"
import MessageListHeader from "@/pages/messages/MessageListHeader"

type MessageListProps = {
    messages: Message[]
    user: User
    currentPage: MessageType
    deleteModal: DeleteModalType
}

const MessageList = ({ messages, user, currentPage, deleteModal }: MessageListProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [selectedMessages, setSelectedMessages] = useState(new Set<string>())

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
            <MessageListHeader
                selectedMessages={selectedMessages}
                setSelectedMessages={setSelectedMessages}
                messages={messages}
                deleteModal={deleteModal}
                currentPage={currentPage}
            />
            {messages.map((message) => (
                <li
                    onClick={() => {
                        if (currentPage === "drafts") openDraft(message)
                        else openMessageModal(message.id)
                    }}
                    key={message.id}
                    className="transition-full group grid grid-cols-[20px_40px_minmax(110px,_1fr)_20px_40px] gap-1 min-h-[48px] bg-neutral-800 p-1 rounded cursor-pointer hover:brightness-125"
                >
                    <MessageLineCheckbox
                        selectedMessages={selectedMessages}
                        setSelectedMessages={setSelectedMessages}
                        messageId={message.id}
                    />
                    <div className="grid place-items-center">
                        {getMessageImage(currentPage, user.id, message)}
                    </div>
                    <MessageLineBody message={message} />
                    <MessageLineStar currentPage={currentPage} message={message} />
                    <div className="relative flex flex-col items-end justify-between justify-self-end">
                        <p className="text-sm text-neutral-600">
                            {dayjs(message.createdAt).format("DD/MM")}
                        </p>
                        <TbTrash
                            size={ICON_SIZE_SMALL}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (currentPage === "trash") {
                                    deleteModal.open(message.id)
                                } else {
                                    deleteModal.addMessageToTrash([message.id])
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
