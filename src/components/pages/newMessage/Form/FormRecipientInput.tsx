import React from "react"

import type { Recipient } from "@/pages/newMessage/Form/utils/submitMessageRecipient"
import submitMessageRecipient from "@/pages/newMessage/Form/utils/submitMessageRecipient"

type FormRecipientInputProps = {
    recipient: Recipient
    setRecipient: React.Dispatch<React.SetStateAction<Recipient>>
}

const FormRecipientInput = ({ recipient, setRecipient }: FormRecipientInputProps) => {
    return (
        <label className="text-neutral-600 bg-neutral-100 pl-4 rounded grid grid-cols-[40px_1fr] items-center gap-2">
            To
            <input
                className={`${
                    recipient.exists ? "text-green italic" : "text-neutral-900"
                } min-w-120px outline-0 border-0 bg-neutral-100 p-4 py-1 rounded-r`}
                type="text"
                value={recipient.name}
                onChange={(e) => {
                    setRecipient({
                        name: e.target.value.trim(),
                        id: "",
                        exists: false,
                    })
                }}
                onBlur={() => submitMessageRecipient(recipient, setRecipient)}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        submitMessageRecipient(recipient, setRecipient)
                    }
                }}
            />
        </label>
    )
}

export default FormRecipientInput
