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
                className={`min-w-120px bg-neutral-100 outline-0 border-0 text-neutral-900 p-4 py-1 rounded-r`}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
        </label>
    )
}

export default FormSubjectInput
