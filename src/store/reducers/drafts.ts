import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { DraftMessage } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleDelete } from "../utils/deleteThunk"
import { handleLoad } from "../utils/loadThunk"

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
        builder.addCase(
            loadDrafts.fulfilled,
            (state, action: PayloadAction<DraftMessage[]>) => {
                state.messages = action.payload
            }
        )
        handleDelete(builder)
        handleLoad(builder, "drafts/")
    },
})

export const {} = draftsSlice.actions
export default draftsSlice.reducer
