import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Message } from "../../types/message"
import type { DraftStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleLoad } from "../utils/loadThunk"

const initialState: DraftStore = {
    messages: [],
    searchQuery: "",
    selectedDraft: null,
    pending: false,
    error: false,
}

export const loadDrafts = createAsyncThunk("drafts/loadDrafts", async () => {
    return await client.messages.getDrafts.query()
})

export const addToTrash = createAsyncThunk("drafts/addToTrash", async (id: string) => {
    return await client.messages.setTrashByAuthor.mutate(id)
})

export const draftsSlice = createSlice({
    name: "drafts",
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
        builder.addCase(loadDrafts.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        })
        builder.addCase(addToTrash.fulfilled, (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload)
        })
        handleLoad(builder, "drafts/")
    },
})

export const { setStarred, selectDraft, unselectDraft, setPending, setSearchQuery } =
    draftsSlice.actions
export default draftsSlice.reducer
