import type { NextPage } from "next"
import Error from "next/error"
import useMessagesSelector from "../../hooks/store/useMessagesSelector"
import useMessagesInitialize from "../../hooks/store/useMessagesInitialize"

import MessageList from "@/pages/MessageList"

export { getServerSideProps } from "../index"

const Sent: NextPage = () => {
    useMessagesInitialize("sent")
    const { messages, status } = useMessagesSelector("sent")

    if (status.pending) {
        return <div>Loading...</div>
    }

    if (status.error) {
        return <Error statusCode={400} withDarkMode={true} />
    }

    return (
        <main className="min-h-full p-2 pb-10">
            <div className="w-full rounded text-neutral-100 flex flex-col gap-1">
                <MessageList messages={messages} />
            </div>
        </main>
    )
}

export default Sent
