import type { GetServerSideProps } from "next"
import Error from "next/error"
import { getProviders, signIn } from "next-auth/react"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (session && session.user)
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }

    const providers = await getProviders()
    return {
        props: { providers },
    }
}

type SignInProps = {
    providers: ReturnType<typeof getProviders>
}

const Signin = ({ providers }: SignInProps) => {
    if (!providers) return <Error statusCode={400} />

    return (
        <main className="grid h-screen w-screen place-items-center overflow-hidden bg-neutral-900 text-neutral-100">
            <div className="w-72 sm:w-min h-72 grid-rows-[2fr_1fr] sm:grid-cols-[1fr_2fr] p-4 m-4 grid rounded">
                <div className="flex flex-col items-center justify-center gap-2 rounded-t bg-neutral-100 text-neutral-900 sm:w-56 sm:rounded-t-none sm:rounded-tl sm:rounded-bl">
                    <p className="text-lg">Welcome back!</p>
                    <div className="bg-green h-1.5 w-10/12 rounded"></div>
                    <p className="text-sm">Sign in to continue</p>
                </div>
                <div className="grid place-items-center rounded-b bg-neutral-800 sm:w-72 sm:rounded-b-none sm:rounded-tr sm:rounded-br">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="cursor-pointer rounded p-6 py-2 hover:brightness-75 transition-full bg-green"
                                onClick={() => signIn(provider.id)}
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Signin
