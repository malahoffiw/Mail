import { configureStore } from "@reduxjs/toolkit"
import inboxReducer from "./reducers/inbox"
import sentReducer from "./reducers/sent"
import draftsReducer from "./reducers/drafts"

const store = configureStore({
    reducer: {
        inbox: inboxReducer,
        sent: sentReducer,
        drafts: draftsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
