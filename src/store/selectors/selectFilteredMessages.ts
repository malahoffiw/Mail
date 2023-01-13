import type { MessagesStore } from "../../types/store"

export const selectFilteredMessages = (state: MessagesStore) => {
    const { messages, searchQuery } = state
    return messages.filter((message) => {
        const { subject, body, author, recipient } = message
        return (
            subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            body.toLowerCase().includes(searchQuery.toLowerCase()) ||
            author.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            recipient?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
        )
    })
}
