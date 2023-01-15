import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux"
import { deleteMessage } from "../../store/reducers/trash"
import type { MessageType } from "../store/types"

const useDeleteModal = (currentPage: MessageType) => {
    const dispatch = useAppDispatch()

    // required unused variable to declare type of mutable ref
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [addMessageToTrash, setAddMessageToTrash] = useState<(id: string) => void>(() => () => {
        return
    })

    useEffect(() => {
        import(`src/store/reducers/${currentPage}`).then((module) => {
            const { addToTrash } = module

            if (currentPage === "trash") {
                return
            }

            setAddMessageToTrash(() => (id: string) => {
                dispatch(addToTrash(id))
            })
        })
    }, [currentPage, dispatch])

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
