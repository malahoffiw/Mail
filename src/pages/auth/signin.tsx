import type { GetServerSideProps } from "next"
import Error from "next/error"
import { getProviders, signIn } from "next-auth/react"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import styles from "../../styles"

// todo - fix styles on this page (probably signup too)

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
        <main className="w-screen h-screen overflow-hidden bg-neutral-900 text-neutral-100 grid place-items-center">
            <div
                className={
                    "w-72 sm:w-min h-72 grid-rows-[2fr_1fr] sm:grid-cols-[1fr_2fr] p-4 m-4 grid rounded"
                }
            >
                <div
                    className="bg-neutral-100 text-neutral-900 flex flex-col
                items-center justify-center gap-2 sm:w-56
                rounded-t sm:rounded-t-none sm:rounded-tl sm:rounded-bl"
                >
                    <p className="text-lg">Welcome back!</p>
                    <div className="bg-green h-1.5 w-10/12 rounded"></div>
                    <p className="text-sm">Sign in to continue</p>
                </div>
                <div
                    className="bg-neutral-800 grid place-items-center sm:w-72
                rounded-b sm:rounded-b-none sm:rounded-tr sm:rounded-br"
                >
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className={`${styles.btnLarge} ${styles.transition} bg-green`}
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
