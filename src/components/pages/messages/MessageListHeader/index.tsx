import React from "react"
import type { Message } from "../../../../types/message"
import type { DeleteModalType } from "../../../../hooks/utils/useDeleteModal"
import type { MessageType } from "../../../../hooks/store/types"

import HeaderCheckbox from "@/pages/messages/MessageListHeader/HeaderCheckbox"

type MessageLineCheckboxProps = {
    selectedMessages: Set<string>
    setSelectedMessages: React.Dispatch<React.SetStateAction<Set<string>>>
    messages: Message[]
    deleteModal: DeleteModalType
    currentPage: MessageType
}

const MessageListHeader = ({
    selectedMessages,
    setSelectedMessages,
    messages,
    deleteModal,
    currentPage,
}: MessageLineCheckboxProps) => {
    const deleteMultiple = () => {
        deleteModal.open([...selectedMessages])
    }

    const addMultipleToTrash = () => {
        deleteModal.addMessageToTrash([...selectedMessages])
    }

    return (
        <li className="grid grid-cols-[20px_1fr] gap-1 px-1 items-center min-h-[30px] rounded bg-neutral-700">
            <HeaderCheckbox
                selectedMessages={selectedMessages}
                setSelectedMessages={setSelectedMessages}
                messages={messages}
            />
            <button
                disabled={selectedMessages.size === 0}
                className={`${
                    selectedMessages.size === 0 ? "bg-neutral-800" : "bg-ruby hover:brightness-75"
                } transition-full justify-self-end px-4 rounded`}
                onClick={(e) => {
                    e.stopPropagation()
                    if (currentPage === "trash") {
                        deleteMultiple()
                    } else {
                        addMultipleToTrash()
                    }
                }}
            >
                Delete
            </button>
        </li>
    )
}

export default MessageListHeader
