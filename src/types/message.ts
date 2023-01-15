import type { User } from "next-auth"

export interface Message {
    id: string
    authorId: string
    author: User
    recipientId: string | null
    recipient: User | null
    read: boolean
    subject: string
    body: string
    replyToId: string | null
    createdAt: string
    starred: boolean
}
