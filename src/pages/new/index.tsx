import React from "react"
import type { NextPage } from "next"
import MessageForm from "@/pages/newMessage"

export { getServerSideProps } from "../index"

const New: NextPage = () => {
    return (
        <main className="m-4 my-2 flex min-h-max min-w-max flex-col gap-4 overflow-auto rounded bg-neutral-800 p-4">
            <MessageForm />
        </main>
    )
}

export default New
