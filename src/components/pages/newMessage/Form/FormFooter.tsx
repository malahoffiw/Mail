import React from "react"
import { useRouter } from "next/router"

const FormFooter = () => {
    const router = useRouter()

    return (
        <footer className="flex gap-2 self-end">
            <button
                onClick={() => router.back()}
                className="cursor-pointer rounded p-4 py-1 transition-full bg-ruby hover:brightness-75"
                type="button"
            >
                Back
            </button>
            <button
                className="cursor-pointer rounded p-4 py-1 transition-full bg-green hover:brightness-75"
                type="submit"
            >
                Send
            </button>
        </footer>
    )
}

export default FormFooter
