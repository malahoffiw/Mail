import type { NextRouter } from "next/router"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import dayjs from "dayjs"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import type { InboxMessage, SentMessage } from "../../../types/message"
import Loader from "@/Loader"
import { ICON_SIZE } from "@/Sidebar"
import { IoArrowBack } from "react-icons/io5"
import { closeModal } from "../../../store/reducers/modal"

const getCurrentPage = (router: NextRouter) => {
    const currentPage = router.pathname
    if (currentPage === "/") return "inbox"
    return "sent"
}

const animationVariants = {
    open: {
        scaleY: 1,
    },
    closed: {
        scaleY: 0,
    },
}

const MessageModal = () => {
    const isOpen = useAppSelector((state) => state.modal.isOpen)
    const dispatch = useAppDispatch()
    const closeMessageModal = () => {
        dispatch(closeModal())
    }

    const router = useRouter()
    const currentPage = getCurrentPage(router)

    const messageId = useAppSelector((state) => state.modal.messageId)
    const messages: (InboxMessage | SentMessage)[] = useAppSelector(
        (state) => state[currentPage].messages
    )
    const message = messages.find((message) => message.id === messageId)

    return (
        <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={animationVariants}
            className={
                "absolute z-10 top-0 left-0 origin-bottom h-full w-full flex flex-col items-center gap-2 rounded bg-neutral-900 text-neutral-100"
            }
        >
            {!message ? (
                <Loader />
            ) : (
                <>
                    <div className="px-2 w-full flex items-center bg-green text-neutral-900 h-10">
                        <IoArrowBack
                            size={ICON_SIZE}
                            onClick={closeMessageModal}
                        />
                    </div>
                    <p>{dayjs(message.createdAt).format("DD/MM HH:mm")}</p>
                    <p className="bg-neutral-100">Author</p>
                    <p>Recipient</p>
                    <p>{message.subject}</p>
                    <p>{message.body}</p>
                </>
            )}
        </motion.div>
    )
}

export default MessageModal
