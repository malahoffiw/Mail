import { useCallback } from "react"
import { trpc } from "../../utils/trpc"

const useNewDraftMutation = () => {
    const { mutate, status: draftStatus } =
        trpc.messages.createDraft.useMutation()

    const createDraft = useCallback(
        async (recipientId: string, subject: string, editorContent: string) => {
            mutate({
                subject,
                recipientId: recipientId.length > 0 ? recipientId : undefined,
                body: editorContent,
            })
        },
        [mutate]
    )

    return { draftStatus, createDraft }
}

export default useNewDraftMutation
