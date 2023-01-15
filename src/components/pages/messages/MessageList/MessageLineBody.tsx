import sanitizeHtml from "sanitize-html"
import type { Message } from "../../../../types/message"

const sanitize = (html: string) => {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {},
    })
}

type MessageLineBodyProps = {
    message: Message
}

const MessageLineBody = ({ message }: MessageLineBodyProps) => {
    return (
        <div className="relative w-full">
            <p>
                {message.subject.length === 0 && message.body.length === 0
                    ? "{ Empty message }"
                    : message.subject}
            </p>
            <p className="break-words text-sm text-neutral-600">{sanitize(message.body)}</p>
        </div>
    )
}

export default MessageLineBody
