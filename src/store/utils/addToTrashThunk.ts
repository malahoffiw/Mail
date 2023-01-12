import type { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { MessagesStore } from "../../types/store"
import { client } from "../../utils/trpc"
import { handleLoad } from "./loadThunk"

export const addToTrash = createAsyncThunk(
    "any/addToTrash",
    async (id: string) => {
        return await client.messages.setDeleted.mutate(id)
    }
)

export const handleAddingToTrash = (
    builder: ActionReducerMapBuilder<MessagesStore>
) => {
    builder.addCase(addToTrash.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
            (message) => message.id !== action.payload
        )
    })
    handleLoad(builder, "any/")
}
