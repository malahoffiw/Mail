import { useState } from "react"
import Head from "next/head"
import { type AppType } from "next/app"
import { useRouter } from "next/router"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import store from "../store"
import { trpc } from "../utils/trpc"

import "../styles/globals.css"

import Sidebar from "@/sidebar"
import Header from "@/header"

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps,
}) => {
    const { session } = pageProps
    const router = useRouter()

    const [sidebarState, setSidebarState] = useState<"open" | "closed">(
        "closed"
    )

    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <Head>
                    <title>T3 Demo</title>
                    <meta
                        name="description"
                        content="Mail app built with T3 and Next.js"
                    />
                    <link rel="icon" href="/favicon.ico" />
                    {/*<link rel="apple-touch-icon" href="/apple-touch-icon.png" />*/}
                    {/*<link rel="manifest" href="/site.webmanifest" />*/}
                </Head>
                <div className="grid grid-cols-1 sm:grid-cols-none sm:auto-cols-[min-content_1fr] grid-rows-[64px_1fr] h-screen w-screen">
                    {router.pathname !== "/auth/signin" &&
                        router.pathname !== "/auth/signup" && (
                            <>
                                <Header setSidebarState={setSidebarState} />
                                <Sidebar
                                    state={sidebarState}
                                    setState={setSidebarState}
                                />
                            </>
                        )}
                    <Component {...pageProps} />
                </div>
            </Provider>
        </SessionProvider>
    )
}

export default trpc.withTRPC(MyApp)
