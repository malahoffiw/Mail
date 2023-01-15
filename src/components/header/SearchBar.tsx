import React, { useState } from "react"
import { MdOutlineSearch } from "react-icons/md"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import useSearchQuery from "../../hooks/utils/useSearchQuery"
import type { MessageType } from "../../hooks/store/types"

import { ICON_SIZE } from "@/sidebar"

type SearchBarProps = {
    currentPage: MessageType
}

const animationKeyframe = (el: Element, action: "add" | "remove" | "remain") => {
    let keyframes: Keyframe[] = []

    if (action === "add") {
        keyframes = [
            { transform: "scaleX(0)", opacity: 0 },
            { transform: "scaleX(1.1)", opacity: 1, offset: 0.75 },
            { transform: "scaleX(1)", opacity: 1 },
        ]
    }

    if (action === "remove") {
        keyframes = [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.1)", opacity: 1, offset: 0.33 },
            { transform: "scale(0.7)", opacity: 0.1, offset: 0.5 },
            { transform: "scale(0.5)", opacity: 0 },
        ]
    }

    return new KeyframeEffect(el, keyframes, {
        duration: 300,
        easing: "ease-in-out",
    })
}

const SearchBar = ({ currentPage }: SearchBarProps) => {
    const [animationParent] = useAutoAnimate<HTMLDivElement>(animationKeyframe)

    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useSearchQuery(currentPage)

    return (
        <div className="relative" ref={animationParent}>
            {isOpen ? (
                <input
                    type="text"
                    placeholder="Search"
                    className="absolute -top-4 right-0 z-20 w-40 origin-right rounded bg-neutral-800 px-4 py-1 text-neutral-100 outline-green sm:w-64"
                    value={query}
                    onChange={setQuery}
                    autoFocus
                    onBlur={() => setIsOpen(false)}
                />
            ) : (
                <div
                    className="transition-full px-2 h-[30px] rounded grid place-items-center cursor-pointer hover:bg-neutral-800"
                    onClick={() => setIsOpen(true)}
                >
                    <MdOutlineSearch size={ICON_SIZE} />
                </div>
            )}
        </div>
    )
}

export default SearchBar
