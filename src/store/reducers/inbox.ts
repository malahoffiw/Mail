import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { InboxMessage } from "../../types/message"
import { client } from "../../utils/trpc"
import type { MessagesStore } from "../../types/store"

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
        builder.addCase(loadInbox.pending, (state) => {
            state.pending = true
        })
        builder.addCase(
            loadInbox.fulfilled,
            (state, action: PayloadAction<InboxMessage[]>) => {
                state.pending = false
                state.messages = action.payload
            }
        )
        builder.addCase(loadInbox.rejected, (state) => {
            state.pending = false
            state.error = true
        })
    },
})

export const {} = inboxSlice.actions
export default inboxSlice.reducer
