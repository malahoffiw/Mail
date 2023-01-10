import type { NextPage } from "next"
import Error from "next/error"
import useMessagesSelector from "../../hooks/store/useMessagesSelector"
import useMessagesInitialize from "../../hooks/store/useMessagesInitialize"

import Messages from "@/pages/messages"
import Loader from "@/Loader"

export { getServerSideProps } from "../index"

const Drafts: NextPage = () => {
    useMessagesInitialize("drafts")
    const { messages, status } = useMessagesSelector("drafts")

    if (status.pending) {
        return <Loader />
    }

    if (status.error) {
        return <Error statusCode={400} withDarkMode={true} />
    }

    return <Messages messages={messages} />
}

export default Drafts
