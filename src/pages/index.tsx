import type { GetServerSideProps, NextPage } from "next"
import Error from "next/error"
import { getServerAuthSession } from "../server/common/get-server-auth-session"
import useMessagesSelector from "../hooks/store/useMessagesSelector"
import useMessagesInitialize from "../hooks/store/useMessagesInitialize"

import MessageList from "@/pages/MessageList"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (!session || !session.user)
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        }

    return {
        props: {},
    }
}

const Inbox: NextPage = () => {
    useMessagesInitialize("inbox")
    const { messages, status } = useMessagesSelector("inbox")

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

export default Inbox
