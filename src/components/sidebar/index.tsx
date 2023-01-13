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
import styles from "../../styles"

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

const Sidebar = ({ state, setState }: SidebarProps) => {
    const windowWidth = useWindowWidth()
    const router = useRouter()
    const currentPage = router.pathname

    const dispatch = useAppDispatch()

    const closeSidebar = () => {
        state === "open" && setState("closed")
        dispatch(closeModal())
    }

    return (
        <motion.ul
            animate={state}
            variants={
                windowWidth > 640
                    ? animationVariants.desktop
                    : animationVariants.mobile
            }
            className={
                windowWidth > 640 ? styles.sidebarDesktop : styles.sidebarMobile
            }
        >
            <Link
                href={"/new"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconMain} ${
                    styles.transition
                } bg-green ${currentPage === "/new" && "pointer-events-none"}`}
            >
                <li className={styles.sidebarBtn}>
                    <BiPencil size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Compose</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
            <Link
                href={"/"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconSecondary} ${
                    styles.transition
                } ${
                    currentPage === "/" && "pointer-events-none brightness-150"
                }`}
            >
                <li className={styles.sidebarBtn}>
                    <MdOutlineMailOutline size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Inbox</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
            <Link
                href={"/sent"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconSecondary} ${
                    styles.transition
                } ${
                    currentPage === "/sent" &&
                    "pointer-events-none brightness-150"
                }`}
            >
                <li className={styles.sidebarBtn}>
                    <TiArrowBackOutline size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Sent</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
            <Link
                href={"/drafts"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconSecondary} ${
                    styles.transition
                } ${
                    currentPage === "/drafts" &&
                    "pointer-events-none brightness-150"
                }`}
            >
                <li className={styles.sidebarBtn}>
                    <RiDraftLine size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Drafts</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
            <Link
                href={"/"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconSecondary} ${
                    styles.transition
                } ${
                    currentPage === "/spam" &&
                    "pointer-events-none brightness-150"
                }`}
            >
                <li className={styles.sidebarBtn}>
                    <RiSpam3Line size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Spam</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
            <Link
                href={"/trash"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconSecondary} ${
                    styles.transition
                } ${
                    currentPage === "/trash" &&
                    "pointer-events-none brightness-150"
                }`}
            >
                <li className={styles.sidebarBtn}>
                    <TbTrash size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Trash</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
            <li
                onClick={() => signOut()}
                className={`${styles.sidebarIconMain} bg-ruby mt-auto ${styles.transition} ${styles.sidebarBtn}`}
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
