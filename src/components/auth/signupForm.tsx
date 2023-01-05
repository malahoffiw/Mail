import React, { useState } from "react"
import styles from "../../styles"

type SignupFormProps = {
    onSubmit: (username: string) => void
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
    const [username, setUsername] = useState("")

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit(username)
            }}
            className="flex flex-col gap-4"
        >
            <input
                className={`outline-0 border-0 text-neutral-900 p-4 py-1 rounded`}
                type="text"
                placeholder="Username"
                value={username}
                required
                pattern="[a-zA-Z\d_-]{1,30}"
                onChange={(e) => setUsername(e.target.value)}
            />
            <button
                type={"submit"}
                className={`${styles.btnLarge} ${styles.transition} text-neutral-100 bg-green`}
            >
                Create account
            </button>
        </form>
    )
}

export default SignupForm
