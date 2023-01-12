import React from "react"
import { TbTrash } from "react-icons/tb"
import type { MessageType } from "../../../hooks/store/types"

type DeleteMessageBtnProps = {
    currentPage: MessageType
    openDeleteModal: () => void
    addMessageToTrash: () => void
}

const DeleteMessageBtn = ({
    currentPage,
    openDeleteModal,
    addMessageToTrash,
}: DeleteMessageBtnProps) => {
    return (
        <TbTrash
            size={16}
            onClick={(e) => {
                e.stopPropagation()
                if (currentPage === "trash") {
                    openDeleteModal()
                } else {
                    addMessageToTrash()
                }
            }}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-neutral-600 sm:hover:text-neutral-100 sm:cursor-pointer"
        />
    )
}

export default DeleteMessageBtn
