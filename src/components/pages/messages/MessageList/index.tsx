import { useState } from "react"
import { useRouter } from "next/router"
import type { User } from "next-auth"
import dayjs from "dayjs"
import sanitizeHtml from "sanitize-html"
import { useAppDispatch } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import { assignMessage, openModal } from "../../../../store/reducers/modal"
import { selectDraft, setPending } from "../../../../store/reducers/drafts"
import { addToTrash } from "../../../../store/utils/addToTrashThunk"
import type { Message } from "../../../../types/message"
import styles from "../../../../styles"

import getMessageImage from "@/pages/utils/getMessageImagePath"
import DeleteModal from "@/pages/messages/MessageList/DeleteModal"
import { deleteMessage } from "../../../../store/reducers/trash"
import DeleteMessageBtn from "@/pages/messages/DeleteMessageBtn"

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

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedMessageId, setSelectedMessageId] = useState("")

    const closeModal = () => {
        setIsDeleteModalOpen(false)
        setSelectedMessageId("")
    }

    const deleteMessagePermanently = () => {
        dispatch(deleteMessage(selectedMessageId))
    }

    const openDraft = (message: Message) => {
        dispatch(setPending(true))
        dispatch(selectDraft(message))
        router.push("/new")
    }

    const openMessageModal = (id: string) => {
        dispatch(assignMessage(id))
        dispatch(openModal())
    }

    const addMessageToTrash = (id: string) => {
        dispatch(addToTrash(id))
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
                        <DeleteMessageBtn
                            currentPage={currentPage}
                            openDeleteModal={() => {
                                setIsDeleteModalOpen(true)
                                setSelectedMessageId(message.id)
                            }}
                            addMessageToTrash={() =>
                                addMessageToTrash(message.id)
                            }
                        />
                    </div>
                </li>
            ))}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                closeModal={closeModal}
                deleteMessage={deleteMessagePermanently}
            />
        </>
    )
}

export default MessageList
