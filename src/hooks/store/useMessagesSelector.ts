import { useAppSelector } from "../redux"
import type { MessageType } from "./types"

const useMessagesSelector = (type: MessageType) => {
    const status = useAppSelector((state) => ({
        pending: state[type].pending,
        error: state[type].error,
    }))
    const messages = useAppSelector((state) => state[type].messages)

    return { status, messages }
}

export default useMessagesSelector
