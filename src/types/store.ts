import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
    TrashMessage,
} from "./message"

export interface MessagesStore<
    T extends InboxMessage | DraftMessage | SentMessage | TrashMessage
> {
    messages: T[]
    pending: boolean
    error: boolean
}
