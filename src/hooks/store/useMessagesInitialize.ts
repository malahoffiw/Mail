import { useEffect } from "react"
import { useAppDispatch } from "../redux"
import { loadInbox } from "../../store/reducers/inbox"
import { loadDrafts } from "../../store/reducers/drafts"
import { loadSent } from "../../store/reducers/sent"
import { loadTrash } from "../../store/reducers/trash"
import type { MessageType } from "./types"

const useMessagesInitialize = (type: MessageType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        switch (type) {
            case "inbox":
                dispatch(loadInbox())
                break
            case "drafts":
                dispatch(loadDrafts())
                break
            case "sent":
                dispatch(loadSent())
                break
            case "trash":
                dispatch(loadTrash())
                break
            default:
                break
        }
    }, [dispatch, type])
}

export default useMessagesInitialize
