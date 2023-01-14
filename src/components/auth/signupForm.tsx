import React, { useState } from "react"
import { motion } from "framer-motion"

type SignupFormProps = {
    onSubmit: (username: string) => void
    isUsernameTaken: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const SignupForm = ({ onSubmit, isUsernameTaken }: SignupFormProps) => {
    const [username, setUsername] = useState("")
    const [isTaken, setIsTaken] = isUsernameTaken

    const variants = {
        open: { opacity: 1, scaleY: 1 },
        closed: { opacity: 0, scaleY: 0 },
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit(username)
            }}
            className="flex flex-col gap-4"
        >
            <input
                // todo - onInvalid try to use custom
                className="rounded border-0 p-4 py-1 text-neutral-900 outline-0"
                type="text"
                placeholder="Username"
                value={username}
                required
                pattern="[a-zA-Z\d_-]{1,30}"
                onChange={(e) => {
                    isTaken && setIsTaken(false)
                    setUsername(e.target.value)
                }}
            />
            <motion.p
                className="text-center text-xs text-yellow"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                animate={isTaken ? "open" : "closed"}
                variants={variants}
            >
                Username already taken
            </motion.p>
            <button
                type={"submit"}
                className="cursor-pointer rounded p-6 py-2 text-neutral-100 transition-full bg-green hover:brightness-75"
            >
                Create account
            </button>
        </form>
    )
}

export default SignupForm
