import { createAsyncThunk } from "@reduxjs/toolkit"
import { client } from "../../utils/trpc"

export const setStarredInDB = createAsyncThunk(
    "any/starMessage",
    async ({ id, starred }: { id: string; starred: boolean }) => {
        const userType = await client.messages.getUserTypeForMessageById.query(id)

        switch (userType) {
            case "author":
                return await client.messages.setStarredByAuthor.mutate({ id, starred })
            case "recipient":
                return await client.messages.setStarredByRecipient.mutate({ id, starred })
            case "both":
                await client.messages.setStarredByAuthor.mutate({ id, starred })
                return await client.messages.setStarredByRecipient.mutate({ id, starred })
            default:
                return null
        }
    }
)
