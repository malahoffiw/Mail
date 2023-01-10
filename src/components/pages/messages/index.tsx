import React from "react"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../../types/message"
import styles from "../../../styles"

import MessageList from "@/pages/messages/MessageList"

type MessagesProps = {
    messages: (InboxMessage | SentMessage | DraftMessage)[]
}

const Messages = ({ messages }: MessagesProps) => {
    if (messages.length === 0) {
        return (
            <main className={styles.mainCenter}>
                <p className="text-2xl text-neutral-600">No messages</p>
            </main>
        )
    }

    return (
        <main className="min-h-max min-w-max text-neutral-100 bg-neutral-800 p-2 m-4 my-2 rounded overflow-auto">
            <ul className="rounded flex flex-col gap-1">
                <MessageList messages={messages} />
            </ul>
        </main>
    )
}

export default Messages
