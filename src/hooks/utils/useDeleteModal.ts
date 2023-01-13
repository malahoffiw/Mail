import { useState } from "react"
import { useAppDispatch } from "../redux"
import { addToTrash } from "../../store/utils/addToTrashThunk"
import { deleteMessage } from "../../store/reducers/trash"

const useDeleteModal = () => {
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedMessageId, setSelectedMessageId] = useState("")

    const open = (id: string) => {
        setIsOpen(true)
        setSelectedMessageId(id)
    }

    const close = () => {
        setIsOpen(false)
        setSelectedMessageId("")
    }

    const addMessageToTrash = (id: string) => {
        dispatch(addToTrash(id))
    }

    const deleteMessagePermanently = () => {
        dispatch(deleteMessage(selectedMessageId))
    }

    return {
        isOpen,
        open,
        close,
        addMessageToTrash,
        deleteMessagePermanently,
    }
}

export default useDeleteModal
export type DeleteModalType = ReturnType<typeof useDeleteModal>
