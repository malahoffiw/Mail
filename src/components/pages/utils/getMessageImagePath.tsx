import React from "react"
import Image from "next/image"
import { HiOutlineUserCircle } from "react-icons/hi2"
import type { Message } from "../../../types/message"
import type { MessageType } from "../../../hooks/store/types"

import { ICON_SIZE_LARGE } from "@/Sidebar"

const getMessageImage = (
    currentPage: MessageType,
    userId: string,
    message: Message
) => {
    const getMessageImagePath = () => {
        if (currentPage === "inbox") return message.author.image
        if (currentPage === "drafts" && message.recipient)
            return message.recipient.image
        if (currentPage === "sent" && message.recipient)
            return message.recipient.image

        // currentPage === "trash"
        if (message.authorId === userId && message.recipientId === userId)
            return message.author.image
        if (message.recipientId === userId) return message.author.image
        return message.recipient?.image
    }

    const path = getMessageImagePath()

    if (!path) return <HiOutlineUserCircle size={ICON_SIZE_LARGE} />

    return (
        <Image
            src={path}
            alt="user image"
            width={ICON_SIZE_LARGE}
            height={ICON_SIZE_LARGE}
            className="rounded-full border-neutral-100 border-2"
        />
    )
}

export default getMessageImage
