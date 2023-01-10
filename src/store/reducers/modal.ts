import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messageId: "",
    isOpen: false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        assignMessage: (state, action) => {
            state.messageId = action.payload
        },
        dismissMessage: (state) => {
            state.messageId = ""
        },
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        },
    },
})

export const { assignMessage, dismissMessage, closeModal, openModal } =
    modalSlice.actions

export default modalSlice.reducer
