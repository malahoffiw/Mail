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

export const deleteMessages = createAsyncThunk(
    "trash/deleteMultipleMessages",
    async (ids: string[]) => {
        const userTypes = await client.messages.getUserTypeForMessageByIdMultiple.query(ids)

        const deletedByAuthor = []
        const deletedByRecipient = []

        for (const [id, type] of userTypes.entries()) {
            switch (type) {
                case "author":
                    deletedByAuthor.push(id)
                    break
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
            await client.messages.setDeletedByAuthor.mutate(deletedByAuthor)
        }
        if (deletedByRecipient.length > 0) {
            await client.messages.setDeletedByRecipient.mutate(deletedByRecipient)
        }

        return ids
    }
)

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
        builder.addCase(deleteMessages.fulfilled, (state, action) => {
            state.messages = state.messages.filter(
                (message) => !action.payload.includes(message.id)
            )
        })
        handleLoad(builder, "trash/")
    },
})

export const { setStarred, setSearchQuery } = trashSLice.actions
export default trashSLice.reducer
