import React, { useState } from "react"
import { MdOutlineSearch } from "react-icons/md"
import useSearchQuery from "../../hooks/utils/useSearchQuery"
import type { MessageType } from "../../hooks/store/types"
import styles from "../../styles"

import { ICON_SIZE } from "@/sidebar"

type SearchBarProps = {
    currentPage: MessageType
}

const SearchBar = ({ currentPage }: SearchBarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useSearchQuery(currentPage)

    return (
        <div>
            {isOpen ? (
                <input
                    type="text"
                    placeholder="Search"
                    className="absolute right-8 top-3 bg-neutral-800 text-neutral-100 rounded outline-green px-4 py-1 w-40 sm:w-64 z-20"
                    value={query}
                    onChange={setQuery}
                    autoFocus
                    onBlur={() => setIsOpen(false)}
                />
            ) : (
                <div
                    className={`${styles.transition} px-2 h-[30px] rounded grid place-items-center cursor-pointer hover:bg-neutral-800`}
                    onClick={() => setIsOpen(true)}
                >
                    <MdOutlineSearch size={ICON_SIZE} />
                </div>
            )}
        </div>
    )
}

export default SearchBar
