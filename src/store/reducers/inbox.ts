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

export const addToTrash = createAsyncThunk("inbox/addToTrash", async (id: string) => {
    const userType = await client.messages.getUserTypeForMessageById.query(id)

    switch (userType) {
        case "recipient":
            return await client.messages.setTrashByRecipient.mutate(id)
        case "both":
            await client.messages.setTrashByAuthor.mutate(id)
            return await client.messages.setTrashByRecipient.mutate(id)
        default:
            return null
    }
})

export const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadInbox.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        })
        builder.addCase(addToTrash.fulfilled, (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload)
        })
        handleLoad(builder, "inbox/")
    },
})

export const { setSearchQuery } = inboxSlice.actions
export default inboxSlice.reducer
