import type { NextPage } from "next"
import { signOut } from "next-auth/react"
import Error from "next/error"
import MessageList from "@/pages/MessageList"
import useMessagesSelector from "../../hooks/store/useMessagesSelector"
import useMessagesInitialize from "../../hooks/store/useMessagesInitialize"

export { getServerSideProps } from "../index"

const Drafts: NextPage = () => {
    useMessagesInitialize("drafts")
    const { messages, status } = useMessagesSelector("drafts")

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
            <br />
            <button
                onClick={() => {
                    signOut()
                }}
            >
                Sign out
            </button>
        </main>
    )
}

export default Drafts
