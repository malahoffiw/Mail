import type { NextRouter } from "next/router"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import dayjs from "dayjs"
import parse from "html-react-parser"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import type {
    InboxMessage,
    SentMessage,
    TrashMessage,
} from "../../../types/message"
import Loader from "@/Loader"
import { ICON_SIZE } from "@/Sidebar"
import { IoArrowBack } from "react-icons/io5"
import { closeModal } from "../../../store/reducers/modal"
import { addToTrash } from "../../../store/utils/deleteThunk"
import { TbTrash } from "react-icons/tb"

const getCurrentPage = (router: NextRouter) => {
    const currentPage = router.pathname
    if (currentPage === "/") return "inbox"
    if (currentPage === "/sent") return "sent"
    return "trash"
}

const animationVariants = {
    open: {
        opacity: 1,
        scaleY: 1,
    },
    closed: {
        opacity: 0,
        scaleY: 0,
    },
}

const MessageModal = () => {
    const isOpen = useAppSelector((state) => state.modal.isOpen)
    const dispatch = useAppDispatch()
    const closeMessageModal = () => {
        dispatch(closeModal())
    }

    const deleteMessage = (id: string) => {
        dispatch(addToTrash(id))
        closeMessageModal()
    }

    const router = useRouter()
    const currentPage = getCurrentPage(router)

    const messageId = useAppSelector((state) => state.modal.messageId)
    const messages: (InboxMessage | SentMessage | TrashMessage)[] =
        useAppSelector((state) => state[currentPage].messages)
    const message = messages.find((message) => message.id === messageId)

    return (
        <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={animationVariants}
            className={
                "absolute z-10 top-0 left-0 opacity-0 origin-bottom h-full w-full rounded bg-neutral-800 text-neutral-100"
            }
        >
            <div className="px-4 w-full flex items-center justify-between bg-green h-10">
                <IoArrowBack
                    className="cursor-pointer"
                    size={ICON_SIZE}
                    onClick={closeMessageModal}
                />
                <TbTrash
                    size={ICON_SIZE}
                    className="cursor-pointer"
                    onClick={() => deleteMessage(messageId)}
                />
            </div>
            {!message ? (
                <Loader />
            ) : (
                <div className="p-4 flex flex-col items-center gap-2 text-neutral-900">
                    <label className="bg-neutral-100 text-neutral-600 px-4 py-1 w-full rounded grid grid-cols-[80px_1fr]">
                        Author
                        <p className="text-neutral-900">Кто то</p>
                    </label>
                    <p className="bg-neutral-100 text-neutral-600 px-4 py-1 w-full rounded grid grid-cols-[80px_1fr]">
                        Recipient
                        <p className="text-neutral-900">Кто то</p>
                    </p>
                    <label className="bg-neutral-100 text-neutral-600 px-4 py-1 w-full rounded grid grid-cols-[80px_1fr]">
                        Subject
                        <p className="text-neutral-900">{message.subject}</p>
                    </label>
                    <div className="relative w-full bg-neutral-100 rounded px-4 py-1">
                        <p className="absolute top-1 right-1 text-sm text-neutral-600">
                            {dayjs(message.createdAt).format("DD/MM HH:mm")}
                        </p>
                        {parse(message.body)}
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default MessageModal
