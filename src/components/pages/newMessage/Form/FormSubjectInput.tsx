import React from "react"

type FormSubjectInputProps = {
    subject: string
    setSubject: React.Dispatch<React.SetStateAction<string>>
}

const FormSubjectInput = ({ subject, setSubject }: FormSubjectInputProps) => {
    return (
        <label className="text-neutral-600 bg-neutral-100 pl-4 rounded grid grid-cols-[40px_1fr] items-center gap-2">
            Subject
            <input
                className="rounded-r border-0 bg-neutral-100 p-4 py-1 text-neutral-900 outline-0 min-w-120px"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
        </label>
    )
}

export default FormSubjectInput
