import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux"
import { deleteMessages } from "../../store/reducers/trash"
import type { MessageType } from "../store/types"

const useDeleteModal = (currentPage: MessageType) => {
    const dispatch = useAppDispatch()

    // required unused variable to declare type of mutable ref
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [addMessagesToTrash, setAddMessagesToTrash] = useState<(ids: string[]) => void>(
        () => () => {
            return
        }
    )

    useEffect(() => {
        import(`src/store/reducers/${currentPage}`).then((module) => {
            const { addToTrash } = module

            if (currentPage === "trash") {
                return
            }

            setAddMessagesToTrash(() => (ids: string[]) => {
                dispatch(addToTrash(ids))
            })
        })
    }, [currentPage, dispatch])

    const [isOpen, setIsOpen] = useState(false)
    const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([])

    const open = (id: string | string[]) => {
        setIsOpen(true)
        if (typeof id === "string") {
            setSelectedMessageIds([id])
        } else {
            setSelectedMessageIds(id)
        }
    }

    const close = () => {
        setIsOpen(false)
        setSelectedMessageIds([])
    }

    const deleteMessagePermanently = () => {
        dispatch(deleteMessages(selectedMessageIds))
    }

    return {
        amountSelected: selectedMessageIds.length,
        isOpen,
        open,
        close,
        addMessageToTrash: addMessagesToTrash,
        deleteMessagePermanently,
    }
}

export default useDeleteModal
export type DeleteModalType = ReturnType<typeof useDeleteModal>
