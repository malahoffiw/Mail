import type { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/router"
import { MdMenu } from "react-icons/md"
import type { MessageType } from "../../hooks/store/types"

import { ICON_SIZE } from "@/sidebar"
import SearchBar from "@/header/SearchBar"

type HeaderProps = {
    setSidebarState: Dispatch<SetStateAction<"open" | "closed">>
}

const pageNames = {
    "/": "Inbox",
    "/sent": "Sent",
    "/drafts": "Drafts",
    "/trash": "Trash",
    "/spam": "Spam",
    "/new": "Compose",
}

const Header = ({ setSidebarState }: HeaderProps) => {
    const router = useRouter()
    const currentPage = pageNames[router.pathname as keyof typeof pageNames]

    return (
        <header className="col-span-2 border-b flex gap-4 text-neutral-100 h-14 items-center px-6">
            <MdMenu
                className="cursor-pointer hover:scale-110"
                size={ICON_SIZE}
                onClick={() =>
                    setSidebarState((prevState) =>
                        prevState === "open" ? "closed" : "open"
                    )
                }
            />
            <h1 className="text-lg font-bold flex items-center gap-2 mr-auto">
                {currentPage}
            </h1>
            {currentPage !== "Compose" && (
                <SearchBar
                    currentPage={currentPage.toLowerCase() as MessageType}
                />
            )}
        </header>
    )
}

export default Header
