import React, { useState } from "react"
import type { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import { trpc } from "../../utils/trpc"

import SignupForm from "@/auth/signupForm"

export const nameAllowed = new RegExp(/^[a-zA-Z\d_-]{1,30}$/)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (!session || !session.user)
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        }

    if (session && session.user && session.user.name && nameAllowed.test(session.user.name))
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }

    return {
        props: {},
    }
}

const Signup = () => {
    const router = useRouter()
    const { data: existingNames } = trpc.users.getNames.useQuery()
    const updateName = trpc.users.updateName.useMutation()

    const isUsernameTaken = useState(false)
    const [, setIsUsernameTaken] = isUsernameTaken

    const onSubmit = (username: string) => {
        if (existingNames && existingNames.includes(username)) {
            setIsUsernameTaken(true)
            return
        }

        if (existingNames && !existingNames.includes(username)) {
            updateName.mutate(username)
            router.push("/")
        }
    }

    return (
        <main className="grid h-screen w-screen place-items-center overflow-hidden bg-neutral-900 text-neutral-100">
            <div className="m-4 flex h-72 flex-col items-center justify-center gap-6 rounded bg-neutral-800 p-10">
                <p className="text-lg">Create a username</p>
                <SignupForm onSubmit={onSubmit} isUsernameTaken={isUsernameTaken} />
            </div>
        </main>
    )
}

export default Signup
