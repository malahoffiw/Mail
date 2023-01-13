import React from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import type { Message } from "../../../types/message"
import useDeleteModal from "../../../hooks/utils/useDeleteModal"
import styles from "../../../styles"

import MessageList from "@/pages/messages/MessageList"
import MessageModal from "@/pages/messages/MessageModal"
import DeleteModal from "@/pages/messages/DeleteModal"
import getCurrentPage from "@/pages/utils/getCurrentPage"
import Loader from "@/Loader"

type MessagesProps = {
    messages: Message[]
}

const Messages = ({ messages }: MessagesProps) => {
    const router = useRouter()
    const currentPage = getCurrentPage(router)

    const deleteModal = useDeleteModal()

    const { data: session } = useSession()
    if (!session || !session.user) return <Loader />

    if (messages.length === 0) {
        return (
            <main className={styles.mainCenter}>
                <p className="text-2xl text-neutral-600">No messages</p>
            </main>
        )
    }

    return (
        <main className="relative min-h-max text-neutral-100 bg-neutral-800 p-2 m-4 my-2 rounded overflow-y-auto overflow-x-hidden">
            <ul className="rounded flex flex-col gap-1">
                <MessageList
                    messages={messages}
                    user={session.user}
                    currentPage={currentPage}
                    deleteModal={deleteModal}
                />
            </ul>
            <DeleteModal
                isOpen={deleteModal.isOpen}
                closeModal={deleteModal.close}
                deleteMessage={deleteModal.deleteMessagePermanently}
            />
            <MessageModal
                user={session.user}
                currentPage={currentPage}
                deleteModal={deleteModal}
            />
        </main>
    )
}

export default Messages
