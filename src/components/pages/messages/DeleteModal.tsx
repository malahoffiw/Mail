import { motion } from "framer-motion"
import type { DeleteModalType } from "../../../hooks/utils/useDeleteModal"

const animationVariants = {
    open: {
        scale: 1,
    },
    closed: {
        scale: 0,
    },
}

type DeleteModalProps = {
    deleteModal: DeleteModalType
}

const DeleteModal = ({ deleteModal }: DeleteModalProps) => {
    const { amountSelected, isOpen, close, deleteMessagePermanently } = deleteModal

    return (
        <div
            className={`${
                isOpen ? "opacity-100 z-20" : "opacity-0 -z-20"
            } transition-full w-full h-full grid bg-transparent place-items-center absolute top-0 left-0`}
        >
            <motion.div
                animate={isOpen ? "open" : "closed"}
                transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.4,
                    delay: 0.2,
                }}
                variants={animationVariants}
                className="w-64 h-28 text-neutral-100 rounded p-4  bg-neutral-900"
            >
                <h1 className="h-14 w-full text-center">
                    {amountSelected === 1
                        ? "Are you sure you want to delete this message?"
                        : `Are you sure you want to delete ${amountSelected} messages?`}
                </h1>
                <div className="flex h-6 justify-between">
                    <button
                        className="h-full w-1/3 rounded transition-full bg-ruby hover:brightness-75"
                        onClick={close}
                    >
                        No
                    </button>
                    <button
                        className="h-full w-1/3 rounded transition-full bg-green hover:brightness-75"
                        onClick={deleteMessagePermanently}
                    >
                        Yes
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default DeleteModal
