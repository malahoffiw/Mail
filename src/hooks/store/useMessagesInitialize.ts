import { useAppDispatch } from "../redux"
import { useEffect } from "react"
import { loadInbox } from "../../store/reducers/inbox"
import type { MessageType } from "./types"
import { loadDrafts } from "../../store/reducers/drafts"
import { loadSent } from "../../store/reducers/sent"

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
            default:
                break
        }
    }, [dispatch, type])
}

export default useMessagesInitialize
