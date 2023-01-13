import type { User } from "next-auth"
import { motion } from "framer-motion"
import { useAppSelector } from "../../../../hooks/redux"
import type { MessageType } from "../../../../hooks/store/types"
import type { DeleteModalType } from "../../../../hooks/utils/useDeleteModal"

import ModalBody from "@/pages/messages/MessageModal/ModalBody"
import ModalHeader from "@/pages/messages/MessageModal/ModalHeader"
import Loader from "@/Loader"

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

type MessageModalProps = {
    user: User
    currentPage: MessageType
    deleteModal: DeleteModalType
}

const MessageModal = ({
    user,
    currentPage,
    deleteModal,
}: MessageModalProps) => {
    const isOpen = useAppSelector((state) => state.modal.isOpen)
    const messageId = useAppSelector((state) => state.modal.messageId)

    const messages = useAppSelector((state) => state[currentPage].messages)
    const message = messages.find((message) => message.id === messageId)

    return (
        <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={animationVariants}
            className={
                "absolute z-10 top-0 left-0 opacity-0 origin-bottom h-full w-full rounded bg-neutral-800 text-neutral-100"
            }
        >
            <ModalHeader
                messageId={messageId}
                currentPage={currentPage}
                deleteModal={deleteModal}
            />
            {!message ? (
                <Loader />
            ) : (
                <ModalBody message={message} user={user} />
            )}
        </motion.div>
    )
}

export default MessageModal
