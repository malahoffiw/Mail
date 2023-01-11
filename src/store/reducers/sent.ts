import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Message } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleDelete } from "../utils/deleteThunk"
import { handleLoad } from "../utils/loadThunk"

const initialState: MessagesStore = {
    messages: [],
    pending: false,
    error: false,
}

export const loadSent = createAsyncThunk("sent/loadSent", async () => {
    return await client.messages.getSent.query()
})

export const sentSlice = createSlice({
    name: "sent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            loadSent.fulfilled,
            (state, action: PayloadAction<Message[]>) => {
                state.messages = action.payload
            }
        )
        handleDelete(builder)
        handleLoad(builder, "sent/")
    },
})

export const {} = sentSlice.actions
export default sentSlice.reducer
