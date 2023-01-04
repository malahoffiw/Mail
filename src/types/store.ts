import type { DraftMessage, InboxMessage, SentMessage } from "./message"

export interface MessagesStore<
    T extends InboxMessage | DraftMessage | SentMessage
> {
    messages: T[]
    pending: boolean
    error: boolean
}
