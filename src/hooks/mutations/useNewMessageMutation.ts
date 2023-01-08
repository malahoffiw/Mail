import { trpc } from "../../utils/trpc"

const useNewMessageMutation = () => {
    const { mutate, status: messageStatus } =
        trpc.messages.createMessage.useMutation()

    const createMessage = async (
        recipientId: string,
        subject: string,
        editorContent: string
    ) => {
        mutate({
            subject,
            recipientId,
            body: editorContent,
        })
    }

    return { messageStatus, createMessage }
}

export default useNewMessageMutation
