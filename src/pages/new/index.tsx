import React from "react"
import type { NextPage } from "next"
import MessageForm from "@/pages/newMessage/MessageForm"

const New: NextPage = () => {
    return (
        <main className="min-h-max min-w-max bg-neutral-800 p-4 pb-10 m-4 mt-0 rounded flex flex-col gap-4">
            <MessageForm />
        </main>
    )
}

export default New
