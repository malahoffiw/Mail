export interface Message {
    id: string
    subject: string
    body: string
    replyToId: string | null
    files?: string[] // File[]
    createdAt: string
    starred: boolean
}

export interface InboxMessage extends Message {
    authorId: string
    read: boolean
}

export interface SentMessage extends Message {
    recipientId: string
}

export interface DraftMessage extends Message {
    recipientId?: string
}
