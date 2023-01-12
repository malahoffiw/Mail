import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { ICON_SIZE } from "@/Sidebar"
import { TbTrash } from "react-icons/tb"
import { useAppDispatch } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import { closeModal } from "../../../../store/reducers/modal"
import { addToTrash } from "../../../../store/utils/addToTrashThunk"

type ModalHeaderProps = {
    messageId: string
    currentPage: MessageType
}

const ModalHeader = ({ messageId, currentPage }: ModalHeaderProps) => {
    const dispatch = useAppDispatch()
    const closeMessageModal = () => {
        dispatch(closeModal())
    }

    const deleteMessage = (id: string) => {
        dispatch(addToTrash(id))
        closeMessageModal()
    }

    return (
        <div className="px-4 w-full flex items-center justify-between bg-green h-10">
            <IoArrowBack
                className="cursor-pointer"
                size={ICON_SIZE}
                onClick={closeMessageModal}
            />
            {currentPage !== "trash" && (
                <TbTrash
                    size={ICON_SIZE}
                    className="cursor-pointer"
                    onClick={() => deleteMessage(messageId)}
                />
            )}
        </div>
    )
}

export default ModalHeader
