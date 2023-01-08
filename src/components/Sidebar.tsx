import Link from "next/link"
import { BiPencil, BiTrash } from "react-icons/bi"
import { MdOutlineMailOutline } from "react-icons/md"
import { RiSpam3Line, RiDraftLine } from "react-icons/ri"
import { TiArrowBackOutline } from "react-icons/ti"
import styles from "../styles"

const ICON_SIZE = 24

const Sidebar = () => {
    const iconStyles = `${styles.icon} ${styles.transition} bg-neutral-900 hover:brightness-200`

    return (
        <ul className="flex flex-col gap-2 w-12 items-center m-2 mt-4">
            <li
                className={`${styles.icon} ${styles.transition} bg-green text-neutral-100 hover:brightness-75`}
            >
                <Link href="/new">
                    <BiPencil size={ICON_SIZE} />
                </Link>
            </li>
            <li className={iconStyles}>
                <Link href="/">
                    <MdOutlineMailOutline size={ICON_SIZE} />
                </Link>
            </li>
            <li className={iconStyles}>
                <Link href={"/sent"}>
                    <TiArrowBackOutline size={ICON_SIZE} />
                </Link>
            </li>
            <li className={iconStyles}>
                <Link href={"/drafts"}>
                    <RiDraftLine size={ICON_SIZE} />
                </Link>
            </li>
            <li className={iconStyles}>
                <RiSpam3Line size={ICON_SIZE} />
            </li>
            <li className={iconStyles}>
                <BiTrash size={ICON_SIZE} />
            </li>
        </ul>
    )
}

export default Sidebar
