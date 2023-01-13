import { useAppSelector } from "../redux"
import type { MessageType } from "./types"
import { selectFilteredMessages } from "../../store/selectors/selectFilteredMessages"

const useMessagesSelector = (type: MessageType) => {
    const status = useAppSelector((state) => ({
        pending: state[type].pending,
        error: state[type].error,
    }))
    const messages = useAppSelector((state) =>
        selectFilteredMessages(state[type])
    )

    return { status, messages }
}

export default useMessagesSelector
