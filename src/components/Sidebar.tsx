import { BiPencil, BiTrash } from "react-icons/bi"
import { MdOutlineMailOutline } from "react-icons/md"
import { RiSpam3Line, RiDraftLine } from "react-icons/ri"
import { TiArrowBackOutline } from "react-icons/ti"
import styles from "../styles"
import Link from "next/link"

const ICON_SIZE = 24

const Sidebar = () => {
    return (
        <ul className="flex flex-col gap-2 w-12 items-center m-2 mt-4">
            <li
                className={`${styles.icon} bg-neutral-100 text-neutral-900 hover:bg-neutral-400`}
            >
                <BiPencil size={ICON_SIZE} />
            </li>
            <li className={`${styles.icon} hover:bg-neutral-700`}>
                <Link href="/">
                    <MdOutlineMailOutline size={ICON_SIZE} />
                </Link>
            </li>
            <li className={`${styles.icon} hover:bg-neutral-700`}>
                <Link href={"/sent"}>
                    <TiArrowBackOutline size={ICON_SIZE} />
                </Link>
            </li>
            <li className={`${styles.icon} hover:bg-neutral-700`}>
                <Link href={"/drafts"}>
                    <RiDraftLine size={ICON_SIZE} />
                </Link>
            </li>
            <li className={`${styles.icon} hover:bg-neutral-700`}>
                <RiSpam3Line size={ICON_SIZE} />
            </li>
            <li className={`${styles.icon} hover:bg-neutral-700`}>
                <BiTrash size={ICON_SIZE} />
            </li>
        </ul>
    )
}

export default Sidebar
