import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { DeletedMessage, DraftMessage } from "../../types/message"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleLoad } from "../utils/loadThunk"

const initialState: MessagesStore<DraftMessage> = {
    messages: [],
    pending: false,
    error: false,
}

export const loadDeleted = createAsyncThunk("deleted/loadDeleted", async () => {
    return await client.messages.getDeleted.query()
})

export const deletedSLice = createSlice({
    name: "deleted",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            loadDeleted.fulfilled,
            (state, action: PayloadAction<DeletedMessage[]>) => {
                state.messages = action.payload
            }
        )
        handleLoad(builder, "deleted/")
    },
})

export const {} = deletedSLice.actions
export default deletedSLice.reducer
