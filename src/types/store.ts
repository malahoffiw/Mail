import type { Message } from "./message"

export interface MessagesStore {
    messages: Message[]
    pending: boolean
    error: boolean
}
