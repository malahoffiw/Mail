import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { DraftMessage } from "../../types/message"
import { client } from "../../utils/trpc"
import type { MessagesStore } from "../../types/store"

const initialState: MessagesStore<DraftMessage> = {
    messages: [],
    pending: false,
    error: false,
}

export const loadDrafts = createAsyncThunk("drafts/loadDrafts", async () => {
    return await client.messages.getDrafts.query()
})

export const draftsSlice = createSlice({
    name: "drafts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadDrafts.pending, (state) => {
            state.pending = true
        })
        builder.addCase(
            loadDrafts.fulfilled,
            (state, action: PayloadAction<DraftMessage[]>) => {
                state.pending = false
                state.messages = action.payload
            }
        )
        builder.addCase(loadDrafts.rejected, (state) => {
            state.pending = false
            state.error = true
        })
    },
})

export const {} = draftsSlice.actions
export default draftsSlice.reducer
