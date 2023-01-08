import type React from "react"
import { client } from "../../../../../utils/trpc"

export type Recipient = {
    name: string
    id: string
    exists: boolean
}

// todo - create a throttle or debounce function
const getUser = async (id: string) => {
    if (id.length === 0) {
        return null
    }
    return await client.users.getUser.query(id)
}

const submitMessageRecipient = async (
    recipient: Recipient,
    setRecipient: React.Dispatch<React.SetStateAction<Recipient>>
) => {
    if (!recipient.exists) {
        const user = await getUser(recipient.name)
        if (!user) {
            setRecipient({ ...recipient, exists: false })
        } else {
            setRecipient({ ...recipient, id: user.id, exists: true })
        }
    }
}

export default submitMessageRecipient
