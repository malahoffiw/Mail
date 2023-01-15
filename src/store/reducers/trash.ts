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

export const loadTrash = createAsyncThunk("trash/loadTrash", async () => {
    return await client.messages.getTrash.query()
})

export const deleteMessage = createAsyncThunk("trash/deleteMessage", async (id: string) => {
    const userType = await client.messages.getUserTypeForMessageById.query(id)

    switch (userType) {
        case "author":
            return await client.messages.setDeletedByAuthor.mutate(id)
        case "recipient":
            return await client.messages.setDeletedByRecipient.mutate(id)
        case "both":
            await client.messages.setDeletedByAuthor.mutate(id)
            return await client.messages.setDeletedByRecipient.mutate(id)
        default:
            return null
    }
})

export const trashSLice = createSlice({
    name: "trash",
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
        builder.addCase(loadTrash.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        })
        builder.addCase(deleteMessage.fulfilled, (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload)
        })
        handleLoad(builder, "trash/")
    },
})

export const { setStarred, setSearchQuery } = trashSLice.actions
export default trashSLice.reducer
