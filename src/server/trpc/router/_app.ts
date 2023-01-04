import { router } from "../trpc"
import { messagesRouter } from "./messages"
// import { filesRouter } from "./files"

export const appRouter = router({
    messages: messagesRouter,
    // files: filesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
