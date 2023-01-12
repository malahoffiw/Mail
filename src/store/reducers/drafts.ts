import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Message } from "../../types/message"
import type { DraftStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleDelete } from "../utils/deleteThunk"
import { handleLoad } from "../utils/loadThunk"

const initialState: DraftStore = {
    messages: [],
    selectedDraft: null,
    pending: false,
    error: false,
}

export const loadDrafts = createAsyncThunk("drafts/loadDrafts", async () => {
    return await client.messages.getDrafts.query()
})

export const draftsSlice = createSlice({
    name: "drafts",
    initialState,
    reducers: {
        selectDraft: (state, action: PayloadAction<Message>) => {
            state.selectedDraft = action.payload
        },
        unselectDraft: (state) => {
            state.selectedDraft = null
        },
        setPending: (state, action: PayloadAction<boolean>) => {
            state.pending = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            loadDrafts.fulfilled,
            (state, action: PayloadAction<Message[]>) => {
                state.messages = action.payload
            }
        )
        handleDelete(builder)
        handleLoad(builder, "drafts/")
    },
})

export const { selectDraft, unselectDraft, setPending } = draftsSlice.actions
export default draftsSlice.reducer
