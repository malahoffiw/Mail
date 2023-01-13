import type { Message } from "./message"

export interface MessagesStore {
    messages: Message[]
    searchQuery: string
    pending: boolean
    error: boolean
}

export interface DraftStore extends MessagesStore {
    selectedDraft: Message | null
}
