import React from "react"
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from "react-icons/md"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import type { Message } from "../../../../types/message"

import { ICON_SIZE_SMALL } from "@/sidebar"
import { animationKeyframe } from "@/pages/messages/MessageList/MessageLineStar"

type HeaderCheckboxProps = {
    selectedMessages: Set<string>
    setSelectedMessages: React.Dispatch<React.SetStateAction<Set<string>>>
    messages: Message[]
}

const HeaderCheckbox = ({
    selectedMessages,
    setSelectedMessages,
    messages,
}: HeaderCheckboxProps) => {
    const [animationParent] = useAutoAnimate<HTMLDivElement>(animationKeyframe)

    return (
        <div ref={animationParent} className="grid place-items-center">
            {selectedMessages.size === messages.length && (
                <MdCheckBox
                    onClick={() => setSelectedMessages(new Set())}
                    size={ICON_SIZE_SMALL}
                    className="cursor-pointer text-green"
                />
            )}
            {selectedMessages.size !== messages.length && selectedMessages.size > 0 && (
                <MdIndeterminateCheckBox
                    onClick={() =>
                        setSelectedMessages(new Set(messages.map((message) => message.id)))
                    }
                    size={ICON_SIZE_SMALL}
                    className="cursor-pointer text-green"
                />
            )}
            {selectedMessages.size === 0 && (
                <MdCheckBoxOutlineBlank
                    onClick={() =>
                        setSelectedMessages(new Set(messages.map((message) => message.id)))
                    }
                    size={ICON_SIZE_SMALL}
                    className="cursor-pointer text-neutral-100 hover:text-green"
                />
            )}
        </div>
    )
}

export default HeaderCheckbox
