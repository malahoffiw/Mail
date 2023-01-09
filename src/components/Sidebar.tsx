import type { Dispatch, SetStateAction } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"
import { BiPencil, BiTrash } from "react-icons/bi"
import { MdOutlineMailOutline } from "react-icons/md"
import { RiSpam3Line, RiDraftLine } from "react-icons/ri"
import { TiArrowBackOutline } from "react-icons/ti"
import { FiChevronRight } from "react-icons/fi"
import useWindowWidth from "../hooks/utils/useWindowWidth"
import styles from "../styles"

const ICON_SIZE = 24

type SidebarProps = {
    state: "open" | "closed"
    setState: Dispatch<SetStateAction<"open" | "closed">>
}

// todo - disable and style (like when hovered) btn according to page (eg. disable "Drafts" btn when on drafts page)

const Sidebar = ({ state, setState }: SidebarProps) => {
    const windowWidth = useWindowWidth()

    const closeSidebar = () => {
        state === "open" && setState("closed")
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
                className={`${styles.sidebarIconMain} ${styles.transition}`}
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
                className={`${styles.sidebarIconSecondary} ${styles.transition}`}
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
                className={`${styles.sidebarIconSecondary} ${styles.transition}`}
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
                className={`${styles.sidebarIconSecondary} ${styles.transition}`}
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
                className={`${styles.sidebarIconSecondary} ${styles.transition}`}
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
                href={"/"}
                onClick={closeSidebar}
                className={`${styles.sidebarIconSecondary} ${styles.transition}`}
            >
                <li className={styles.sidebarBtn}>
                    <BiTrash size={ICON_SIZE} />
                    {state === "open" && (
                        <>
                            <p>Trash</p>
                            <FiChevronRight size={ICON_SIZE} />
                        </>
                    )}
                </li>
            </Link>
        </motion.ul>
    )
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false })
