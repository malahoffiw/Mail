import { useAppSelector } from "../redux"

import type { Recipient } from "@/pages/newMessage/Form/utils/submitMessageRecipient"

type InitialFormContent = {
    draftId: string | null
    recipient: Recipient
    subject: string
    body: string
}

const UseMessageFormInitialize = (): InitialFormContent => {
    const selectedDraft = useAppSelector((state) => state.drafts.selectedDraft)

    if (!selectedDraft)
        return {
            draftId: null,
            recipient: {
                name: "",
                id: "",
                exists: false,
            },
            subject: "",
            body: "",
        }

    if (!selectedDraft.recipient)
        return {
            draftId: selectedDraft.id,
            recipient: {
                name: "",
                id: "",
                exists: false,
            },
            subject: selectedDraft.subject,
            body: selectedDraft.body,
        }

    return {
        draftId: selectedDraft.id,
        recipient: {
            name: selectedDraft.recipient.name as string,
            id: selectedDraft.recipient.id,
            exists: true,
        },
        subject: selectedDraft.subject,
        body: selectedDraft.body,
    }
}

export default UseMessageFormInitialize
