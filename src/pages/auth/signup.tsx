import React from "react"
import type { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import { trpc } from "../../utils/trpc"

import SignupForm from "@/auth/signupForm"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (!session || !session.user)
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        }

    if (session && session.user && session.user.name)
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
    const { data: existingNames } = trpc.users.getNames.useQuery()
    const updateName = trpc.users.updateName.useMutation()
    const router = useRouter()

    const onSubmit = (username: string) => {
        if (existingNames && existingNames.includes(username)) {
            console.warn("Username already exists")
            return
        }

        if (existingNames && !existingNames.includes(username)) {
            updateName.mutate(username)
            router.push("/")
        }
    }

    return (
        <main className="absolute min-w-full min-h-full overflow-hidden bg-neutral-900 text-neutral-100 grid place-items-center">
            <div className="p-10 m-4 bg-neutral-800 rounded flex flex-col items-center justify-center gap-6">
                <p className="text-lg">Create a username</p>
                <SignupForm onSubmit={onSubmit} />
            </div>
        </main>
    )
}

export default Signup
