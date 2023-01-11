import type { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { MessagesStore } from "../../types/store"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../types/message"
import { client } from "../../utils/trpc"
import { handleLoad } from "./loadThunk"

export const deleteMessage = createAsyncThunk(
    "any/deleteMessage",
    async (id: string) => {
        return await client.messages.setDeleted.mutate(id)
    }
)

export const handleDelete = (
    builder: ActionReducerMapBuilder<
        MessagesStore<InboxMessage | SentMessage | DraftMessage>
    >
) => {
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
            (message) => message.id !== action.payload.id
        )
    })
    handleLoad(builder, "any/")
}