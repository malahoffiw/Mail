import type { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { MessagesStore } from "../../types/store"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../types/message"
import {
    isFulfilledAction,
    isPendingAction,
    isRejectedAction,
} from "./helpersAsync"

export const handleLoad = (
    builder: ActionReducerMapBuilder<
        MessagesStore<InboxMessage | SentMessage | DraftMessage>
    >,
    prefix: string
) => {
    builder
        .addMatcher(isPendingAction(prefix), (state) => {
            state.pending = true
        })
        .addMatcher(isRejectedAction(prefix), (state) => {
            state.pending = false
            state.error = true
        })
        .addMatcher(isFulfilledAction(prefix), (state) => {
            state.pending = false
        })
}
