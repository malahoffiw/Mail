import React from "react"
import { FiChevronRight } from "react-icons/fi"
import Link from "next/link"

import { ICON_SIZE } from "@/sidebar/index"

type SidebarBtnProps = {
    isOpen: boolean
    closeSidebar: () => void
    currentPage: string
    linkPage: {
        linkTo: string
        icon: React.ReactNode
        name: string
    }
}

const SidebarBtn = ({ isOpen, closeSidebar, currentPage, linkPage }: SidebarBtnProps) => {
    return (
        <Link
            href={linkPage.linkTo}
            onClick={closeSidebar}
            className={`h-10 w-full cursor-pointer rounded bg-neutral-800 p-2 hover:brightness-150 transition-full ${
                currentPage === linkPage.linkTo && "pointer-events-none brightness-150"
            }`}
        >
            <li className="btn-sidebar">
                {linkPage.icon}
                {isOpen && (
                    <>
                        <p>{linkPage.name}</p>
                        <FiChevronRight size={ICON_SIZE} />
                    </>
                )}
            </li>
        </Link>
    )
}

export default SidebarBtn
