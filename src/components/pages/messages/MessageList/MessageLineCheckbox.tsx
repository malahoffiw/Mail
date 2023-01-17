import React from "react"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { ICON_SIZE_SMALL } from "@/sidebar"
import { animationKeyframe } from "@/pages/messages/MessageList/MessageLineStar"

type MessageLineCheckboxProps = {
    selectedMessages: Set<string>
    setSelectedMessages: React.Dispatch<React.SetStateAction<Set<string>>>
    messageId: string
}

const MessageLineCheckbox = ({
    selectedMessages,
    setSelectedMessages,
    messageId,
}: MessageLineCheckboxProps) => {
    const [animationParent] = useAutoAnimate<HTMLDivElement>(animationKeyframe)

    return (
        <div ref={animationParent} className="grid place-items-center">
            {selectedMessages.has(messageId) ? (
                <MdCheckBox
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMessages((prev) => {
                            const newSet = new Set(prev)
                            newSet.delete(messageId)
                            return newSet
                        })
                    }}
                    size={ICON_SIZE_SMALL}
                    className="text-green"
                />
            ) : (
                <MdCheckBoxOutlineBlank
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMessages((prev) => {
                            const newSet = new Set(prev)
                            newSet.add(messageId)
                            return newSet
                        })
                    }}
                    size={ICON_SIZE_SMALL}
                    className="text-neutral-100 hover:text-green"
                />
            )}
        </div>
    )
}

export default MessageLineCheckbox
