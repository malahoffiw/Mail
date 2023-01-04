import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { SentMessage } from "../../types/message"
import { client } from "../../utils/trpc"
import type { MessagesStore } from "../../types/store"

const initialState: MessagesStore<SentMessage> = {
    messages: [],
    pending: false,
    error: false,
}

export const loadSent = createAsyncThunk("inbox/loadSent", async () => {
    return await client.messages.getSent.query()
})

export const sentSlice = createSlice({
    name: "sent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadSent.pending, (state) => {
            state.pending = true
        })
        builder.addCase(
            loadSent.fulfilled,
            (state, action: PayloadAction<SentMessage[]>) => {
                state.pending = false
                state.messages = action.payload
            }
        )
        builder.addCase(loadSent.rejected, (state) => {
            state.pending = false
            state.error = true
        })
    },
})

export const {} = sentSlice.actions
export default sentSlice.reducer
