import type { GetServerSideProps, NextPage } from "next"
import Error from "next/error"
import { getServerAuthSession } from "../server/common/get-server-auth-session"
import useMessagesSelector from "../hooks/store/useMessagesSelector"
import useMessagesInitialize from "../hooks/store/useMessagesInitialize"

import Messages from "@/pages/messages"
import Loader from "@/Loader"
import { nameAllowed } from "./auth/signup"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (!session || !session.user)
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        }

    if (!session.user.name || !nameAllowed.test(session.user.name)) {
        return {
            redirect: {
                destination: "/auth/signup",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

const Inbox: NextPage = () => {
    useMessagesInitialize("inbox")
    const { messages, status } = useMessagesSelector("inbox")

    if (status.pending) {
        return <Loader />
    }

    if (status.error) {
        return <Error statusCode={400} withDarkMode={true} />
    }

    return <Messages messages={messages} />
}

export default Inbox
