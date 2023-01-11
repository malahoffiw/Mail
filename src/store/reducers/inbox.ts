import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { InboxMessage } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleDelete } from "../utils/deleteThunk"
import { handleLoad } from "../utils/loadThunk"

const initialState: MessagesStore<InboxMessage> = {
    messages: [],
    pending: false,
    error: false,
}

export const loadInbox = createAsyncThunk("inbox/loadInbox", async () => {
    return await client.messages.getInbox.query()
})

export const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            loadInbox.fulfilled,
            (state, action: PayloadAction<InboxMessage[]>) => {
                state.messages = action.payload
            }
        )
        handleDelete(builder)
        handleLoad(builder, "inbox/")
    },
})

export const {} = inboxSlice.actions
export default inboxSlice.reducer
