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
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        },
    },
})

export const { assignMessage, closeModal, openModal } = modalSlice.actions

export default modalSlice.reducer
