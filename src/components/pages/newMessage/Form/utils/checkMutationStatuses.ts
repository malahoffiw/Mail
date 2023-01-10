type TRPCStatus = "success" | "loading" | "error" | "idle"

export const isCreated = (status: TRPCStatus) => status === "success"

export const isMessageOrDraftCreated = (
    messageStatus: TRPCStatus,
    draftStatus: TRPCStatus
) => {
    return messageStatus === "success" || draftStatus === "success"
}
export const isMessageOrDraftInProcess = (
    messageStatus: TRPCStatus,
    draftStatus: TRPCStatus
) => {
    return messageStatus === "loading" || draftStatus === "loading"
}
export const isMessageOrDraftThrowingError = (
    messageStatus: TRPCStatus,
    draftStatus: TRPCStatus
) => {
    return messageStatus === "error" || draftStatus === "error"
}
