import { trpc } from "../../utils/trpc"
import type { TRPCStatus } from "@/pages/newMessage/Form/utils/checkMutationStatuses"
import { unselectDraft } from "../../store/reducers/drafts"
import { useAppDispatch } from "../redux"

const useNewMessageMutation = () => {
    const dispatch = useAppDispatch()
    const { mutate: createNewMessage, status: newMessageStatus } =
        trpc.messages.createMessage.useMutation()

    const { mutate: createMessageFromDraft, status: fromDraftMessageStatus } =
        trpc.messages.updateDraft.useMutation()

    const getMessageStatus = (): TRPCStatus => {
        if (newMessageStatus !== "idle") return newMessageStatus
        if (fromDraftMessageStatus !== "idle") return fromDraftMessageStatus
        return "idle"
    }

    const createMessage = async (recipientId: string, subject: string, editorContent: string) => {
        createNewMessage({
            subject,
            recipientId,
            body: editorContent,
        })
    }

    const updateDraftIntoNewMessage = async (
        draftId: string,
        recipientId: string,
        subject: string,
        editorContent: string
    ) => {
        createMessageFromDraft({
            id: draftId,
            subject,
            body: editorContent,
            recipientId,
            isDraft: false,
        })
        dispatch(unselectDraft())
    }

    return { createMessage, updateDraftIntoNewMessage, getMessageStatus }
}

export default useNewMessageMutation
