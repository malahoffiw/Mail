import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Message } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleAddingToTrash } from "../utils/addToTrashThunk"
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

export const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loadInbox.fulfilled,
            (state, action: PayloadAction<Message[]>) => {
                state.messages = action.payload
            }
        )
        handleAddingToTrash(builder)
        handleLoad(builder, "inbox/")
    },
})

export const { setSearchQuery } = inboxSlice.actions
export default inboxSlice.reducer
