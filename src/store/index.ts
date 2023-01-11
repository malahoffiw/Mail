import { configureStore } from "@reduxjs/toolkit"
import inboxReducer from "./reducers/inbox"
import sentReducer from "./reducers/sent"
import draftsReducer from "./reducers/drafts"
import trashReducer from "./reducers/trash"
import modalReducer from "./reducers/modal"

const store = configureStore({
    reducer: {
        inbox: inboxReducer,
        sent: sentReducer,
        drafts: draftsReducer,
        trash: trashReducer,
        modal: modalReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
