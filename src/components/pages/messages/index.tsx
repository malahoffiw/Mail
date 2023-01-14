import React from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import type { Message } from "../../../types/message"
import useDeleteModal from "../../../hooks/utils/useDeleteModal"

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
            <main className="m-4 my-2 grid min-h-max place-items-center rounded bg-neutral-800 text-neutral-100">
                <p className="text-2xl text-neutral-600">No messages</p>
            </main>
        )
    }

    return (
        <main className="relative m-4 my-2 min-h-max overflow-y-auto overflow-x-hidden rounded bg-neutral-800 p-2 text-neutral-100">
            <ul className="flex flex-col gap-1 rounded">
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
