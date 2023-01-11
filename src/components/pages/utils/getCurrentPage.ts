import type { NextRouter } from "next/router"
import type { MessageType } from "../../../hooks/store/types"

const getCurrentPage = (router: NextRouter): MessageType => {
    const currentPage = router.pathname
    if (currentPage === "/") return "inbox"
    if (currentPage === "/sent") return "sent"
    if (currentPage === "/drafts") return "drafts"
    return "trash"
}

export default getCurrentPage
