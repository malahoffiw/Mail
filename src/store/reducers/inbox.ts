import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Message } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleLoad } from "../utils/loadThunk"

const initialState: MessagesStore = {
    messages: [],
    searchQuery: "",
    pending: false,
    error: false,
}

export const loadInbox = createAsyncThunk("inbox/loadInbox", async () => {
    return await client.messages.getInbox.query()
})

export const addToTrash = createAsyncThunk("inbox/addToTrash", async (ids: string[]) => {
    const userTypes = await client.messages.getUserTypeForMessageByIdMultiple.query(ids)

    const deletedByAuthor = []
    const deletedByRecipient = []

    for (const [id, type] of userTypes.entries()) {
        switch (type) {
            case "recipient":
                deletedByRecipient.push(id)
                break
            case "both":
                deletedByAuthor.push(id)
                deletedByRecipient.push(id)
                break
            default:
                break
        }
    }

    if (deletedByAuthor.length > 0) {
        await client.messages.setTrashByAuthor.mutate(deletedByAuthor)
    }
    if (deletedByRecipient.length > 0) {
        await client.messages.setTrashByRecipient.mutate(deletedByRecipient)
    }

    return ids
})

export const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        setStarred: (state, action: PayloadAction<{ id: string; starred: boolean }>) => {
            const message = state.messages.find((message) => message.id === action.payload.id)
            if (message) {
                message.starred = action.payload.starred
            }
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadInbox.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        })
        builder.addCase(addToTrash.fulfilled, (state, action) => {
            state.messages = state.messages.filter(
                (message) => !action.payload.includes(message.id)
            )
        })
        handleLoad(builder, "inbox/")
    },
})

export const { setStarred, setSearchQuery } = inboxSlice.actions
export default inboxSlice.reducer
