import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { TbTrash } from "react-icons/tb"
import { useAppDispatch } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import type { DeleteModalType } from "../../../../hooks/utils/useDeleteModal"
import { closeModal } from "../../../../store/reducers/modal"

import { ICON_SIZE } from "@/sidebar"

type ModalHeaderProps = {
    messageId: string
    currentPage: MessageType
    deleteModal: DeleteModalType
}

const ModalHeader = ({ messageId, currentPage, deleteModal }: ModalHeaderProps) => {
    const dispatch = useAppDispatch()
    const closeMessageModal = () => {
        dispatch(closeModal())
    }

    return (
        <div className="flex h-10 w-full items-center justify-between px-4 bg-green">
            <IoArrowBack className="cursor-pointer" size={ICON_SIZE} onClick={closeMessageModal} />
            <TbTrash
                size={ICON_SIZE}
                onClick={(e) => {
                    e.stopPropagation()
                    if (currentPage === "trash") {
                        deleteModal.open(messageId)
                    } else {
                        deleteModal.addMessageToTrash(messageId)
                    }
                }}
                className="cursor-pointer"
            />
        </div>
    )
}

export default ModalHeader
