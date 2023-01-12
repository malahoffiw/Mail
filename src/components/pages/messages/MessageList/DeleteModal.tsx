import styles from "../../../../styles"

type DeleteModalProps = {
    isOpen: boolean
    closeModal: () => void
    deleteMessage: () => void
}

const DeleteModal = ({
    isOpen,
    deleteMessage,
    closeModal,
}: DeleteModalProps) => {
    return (
        <div
            className={`${isOpen ? "opacity-100 z-20" : "opacity-0 -z-20"} ${
                styles.transition
            } w-full h-full grid bg-transparent place-items-center absolute top-0 left-0`}
        >
            <div
                className={`${isOpen ? "scale-100" : "scale-0"} ${
                    styles.transition
                } w-64 h-28 text-neutral-100 rounded p-4  bg-neutral-900`}
            >
                <h1 className="w-full h-14 text-center">
                    Are you sure you want to delete this message?
                </h1>
                <div className="flex justify-between h-6">
                    <button
                        className={`${styles.transition} bg-ruby rounded w-1/3 h-full hover:brightness-75`}
                        onClick={closeModal}
                    >
                        No
                    </button>
                    <button
                        className={`${styles.transition} bg-green rounded w-1/3 h-full hover:brightness-75`}
                        onClick={deleteMessage}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
