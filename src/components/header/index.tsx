import type { Dispatch, SetStateAction } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { MdMenu, MdOutlineSearch } from "react-icons/md"
import useWindowWidth from "../../hooks/utils/useWindowWidth"
import styles from "../../styles"

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
    const windowWidth = useWindowWidth()
    const currentPage = pageNames[router.pathname as keyof typeof pageNames]

    return (
        <header className="col-span-2 border-b flex gap-4 text-neutral-100 h-14 items-center px-6">
            <MdMenu
                className="cursor-pointer hover:scale-110"
                size={24}
                onClick={() =>
                    setSidebarState((prevState) =>
                        prevState === "open" ? "closed" : "open"
                    )
                }
            />
            <h1 className="text-lg font-bold flex items-center gap-2 mr-auto">
                {windowWidth > 320 && currentPage}
            </h1>
            <MdOutlineSearch size={24} />
            <button
                className={`${styles.btnSmall} ${styles.transition} bg-ruby`}
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </header>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
