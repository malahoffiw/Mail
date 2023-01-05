import type { NextPage } from "next"
import Error from "next/error"
import useMessagesSelector from "../../hooks/store/useMessagesSelector"
import useMessagesInitialize from "../../hooks/store/useMessagesInitialize"

import Messages from "@/pages/Messages"

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

    return <Messages messages={messages} />
}

export default Sent
