import type { Dispatch, SetStateAction } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { BiPencil, BiDoorOpen } from "react-icons/bi"
import { MdOutlineMailOutline } from "react-icons/md"
import { RiSpam3Line, RiDraftLine } from "react-icons/ri"
import { TbTrash } from "react-icons/tb"
import { TiArrowBackOutline } from "react-icons/ti"
import { FiChevronRight } from "react-icons/fi"
import useWindowWidth from "../../hooks/utils/useWindowWidth"
import { useAppDispatch } from "../../hooks/redux"
import { closeModal } from "../../store/reducers/modal"

import SidebarBtn from "@/sidebar/SidebarBtn"

export const ICON_SIZE = 24
export const ICON_SIZE_LARGE = 32

type SidebarProps = {
    state: "open" | "closed"
    setState: Dispatch<SetStateAction<"open" | "closed">>
}

const animationVariants = {
    mobile: {
        open: {
            width: "100vw",
            x: 0,
        },
        closed: {
            width: "100vw",
            x: "-100%",
        },
    },
    desktop: {
        open: { width: "152px", x: 0 },
        closed: { width: "40px", x: 0 },
    },
}

const linkPages = [
    {
        linkTo: "/",
        icon: <MdOutlineMailOutline size={ICON_SIZE} />,
        name: "Inbox",
    },
    {
        linkTo: "/sent",
        icon: <TiArrowBackOutline size={ICON_SIZE} />,
        name: "Sent",
    },
    {
        linkTo: "/drafts",
        icon: <RiDraftLine size={ICON_SIZE} />,
        name: "Drafts",
    },
    {
        linkTo: "/spam",
        icon: <RiSpam3Line size={ICON_SIZE} />,
        name: "Spam",
    },
    {
        linkTo: "/trash",
        icon: <TbTrash size={ICON_SIZE} />,
        name: "Trash",
    },
]

const Sidebar = ({ state, setState }: SidebarProps) => {
    const windowWidth = useWindowWidth()
    const router = useRouter()
    const currentPage = router.pathname

    const dispatch = useAppDispatch()

    const closeSidebar = () => {
        state === "open" && setState("closed")
        dispatch(closeModal())
    }

    const sidebarButtons = linkPages.map((linkPage) => (
        <SidebarBtn
            key={linkPage.linkTo}
            isOpen={state === "open"}
            closeSidebar={closeSidebar}
            currentPage={currentPage}
            linkPage={linkPage}
        />
    ))

    return (
        <motion.ul
            animate={state}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            variants={windowWidth > 640 ? animationVariants.desktop : animationVariants.mobile}
            className={windowWidth > 640 ? "sidebar-desktop" : "sidebar-mobile"}
        >
            <Link
                href={"/new"}
                onClick={closeSidebar}
                className={`mb-2 h-10 w-full cursor-pointer rounded p-2 hover:brightness-75 transition-full bg-green ${
                    currentPage === "/new" && "pointer-events-none"
                }`}
            >
                <li className="btn-sidebar">
                    <BiPencil size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Compose</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>

            {sidebarButtons}

            <li
                onClick={() => signOut()}
                className="mt-auto mb-2 h-10 w-full cursor-pointer rounded p-2 bg-ruby transition-full btn-sidebar hover:brightness-75"
            >
                <BiDoorOpen size={ICON_SIZE} />
                {state === "open" && (
                    <>
                        <p>Sign out</p>
                        <FiChevronRight size={ICON_SIZE} />
                    </>
                )}
            </li>
        </motion.ul>
    )
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false })
