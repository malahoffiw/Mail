import React from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import useStarMessage from "../../../../hooks/utils/useStarMessage"
import type { MessageType } from "../../../../hooks/store/types"
import type { Message } from "../../../../types/message"

import { ICON_SIZE_SMALL } from "@/sidebar"

type MessageLineStarProps = {
    currentPage: MessageType
    message: Message
}

export const animationKeyframe = (el: Element, action: "add" | "remove" | "remain") => {
    let keyframes: Keyframe[] = []

    if (action === "add") {
        keyframes = [
            { transform: "scale(1)", opacity: 0 },
            { transform: "scaleX(1.5)", opacity: 1, offset: 0.75 },
            { transform: "scaleX(1)", opacity: 1 },
        ]
    }

    if (action === "remove") {
        keyframes = [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.5)", opacity: 1, offset: 0.33 },
            { transform: "scale(0.5)", opacity: 0 },
        ]
    }

    return new KeyframeEffect(el, keyframes, {
        duration: 200,
        easing: "ease-in-out",
    })
}

const MessageLineStar = ({ currentPage, message }: MessageLineStarProps) => {
    const { id, starred } = message
    const starMessage = useStarMessage(currentPage, starred)

    const [animationParent] = useAutoAnimate<HTMLDivElement>(animationKeyframe)

    return (
        <div ref={animationParent} className="grid place-items-center">
            {starred ? (
                <AiFillStar
                    onClick={(e) => {
                        e.stopPropagation()
                        starMessage(id)
                    }}
                    size={ICON_SIZE_SMALL}
                    className="text-yellow"
                />
            ) : (
                <AiOutlineStar
                    onClick={(e) => {
                        e.stopPropagation()
                        starMessage(id)
                    }}
                    className="text-neutral-600 opacity-100 hover:text-yellow sm:group-hover:opacity-100 sm:cursor-pointer sm:opacity-0"
                    size={ICON_SIZE_SMALL}
                />
            )}
        </div>
    )
}

export default MessageLineStar
