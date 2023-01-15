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

export const loadSent = createAsyncThunk("sent/loadSent", async () => {
    return await client.messages.getSent.query()
})

export const addToTrash = createAsyncThunk("sent/addToTrash", async (id: string) => {
    const userType = await client.messages.getUserTypeForMessageById.query(id)

    switch (userType) {
        case "author":
            return await client.messages.setTrashByAuthor.mutate(id)
        case "both":
            await client.messages.setTrashByAuthor.mutate(id)
            return await client.messages.setTrashByRecipient.mutate(id)
        default:
            return null
    }
})

export const sentSlice = createSlice({
    name: "sent",
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
        builder.addCase(loadSent.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        })
        builder.addCase(addToTrash.fulfilled, (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload)
        })
        handleLoad(builder, "sent/")
    },
})

export const { setStarred, setSearchQuery } = sentSlice.actions
export default sentSlice.reducer
