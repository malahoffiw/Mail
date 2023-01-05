import type { GetServerSideProps } from "next"
import Error from "next/error"
import { getProviders, signIn } from "next-auth/react"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import styles from "../../styles"

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
        <main className="absolute min-w-full min-h-full overflow-hidden bg-neutral-900 text-neutral-100 grid place-items-center">
            <div className="p-4 m-4 grid grid-cols-[1fr_2fr] w-10/12 h-1/2">
                <div className="bg-neutral-100 text-neutral-900 flex flex-col items-center justify-center gap-2">
                    <p className="text-lg">Welcome back!</p>
                    <div className="bg-green h-1.5 w-10/12 rounded"></div>
                    <p className="text-sm">Sign in to continue</p>
                </div>
                <div className="bg-neutral-800 grid place-items-center">
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
