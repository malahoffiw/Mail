import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { TrashMessage } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleLoad } from "../utils/loadThunk"

const initialState: MessagesStore<TrashMessage> = {
    messages: [],
    pending: false,
    error: false,
}

export const loadTrash = createAsyncThunk("trash/loadTrash", async () => {
    return await client.messages.getDeleted.query()
})

export const trashSLice = createSlice({
    name: "trash",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            loadTrash.fulfilled,
            (state, action: PayloadAction<TrashMessage[]>) => {
                state.messages = action.payload
            }
        )
        handleLoad(builder, "trash/")
    },
})

export const {} = trashSLice.actions
export default trashSLice.reducer
