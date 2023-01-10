import React from "react"
import type { NextPage } from "next"
import MessageForm from "@/pages/newMessage"

export { getServerSideProps } from "../index"

const New: NextPage = () => {
    return (
        <main className="min-h-max min-w-max bg-neutral-800 p-4 m-4 my-2 rounded flex flex-col gap-4 overflow-auto">
            <MessageForm />
        </main>
    )
}

export default New
