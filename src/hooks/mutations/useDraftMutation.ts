import { useCallback } from "react"
import { trpc } from "../../utils/trpc"
import type { TRPCStatus } from "@/pages/newMessage/Form/utils/checkMutationStatuses"
import { unselectDraft } from "../../store/reducers/drafts"
import { useAppDispatch } from "../redux"

const useDraftMutation = () => {
    const dispatch = useAppDispatch()
    const { mutate: createNewDraft, status: newDraftStatus } =
        trpc.messages.createDraft.useMutation()

    const { mutate: updateSelectedDraft, status: updatedDraftStatus } =
        trpc.messages.updateDraft.useMutation()

    const getDraftStatus = (): TRPCStatus => {
        if (newDraftStatus !== "idle") return newDraftStatus
        if (updatedDraftStatus !== "idle") return updatedDraftStatus
        return "idle"
    }

    const createDraft = useCallback(
        async (recipientId: string, subject: string, editorContent: string) => {
            createNewDraft({
                subject,
                body: editorContent,
                recipientId: recipientId.length > 0 ? recipientId : undefined,
            })
        },
        [createNewDraft]
    )

    const updateDraft = useCallback(
        async (
            draftId: string,
            recipientId: string,
            subject: string,
            editorContent: string
        ) => {
            updateSelectedDraft({
                id: draftId,
                subject,
                body: editorContent,
                recipientId: recipientId.length > 0 ? recipientId : undefined,
                isDraft: true,
            })
            dispatch(unselectDraft())
        },
        [dispatch, updateSelectedDraft]
    )

    return {
        createDraft,
        updateDraft,
        getDraftStatus,
    }
}

export default useDraftMutation
