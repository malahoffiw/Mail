import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { trpc } from "../utils/trpc"
import { Provider } from "react-redux"
import store from "../store"

import "../styles/globals.css"
import Head from "next/head"
import Sidebar from "@/Sidebar"
import Header from "@/Header"

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
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
                <div className="grid grid-cols-2 grid-cols-[64px_1fr] grid-rows-[72px_1fr] min-h-screen">
                    <Header />
                    <Sidebar />
                    <Component {...pageProps} />
                </div>
            </Provider>
        </SessionProvider>
    )
}

export default trpc.withTRPC(MyApp)
