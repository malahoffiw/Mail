import { router } from "../trpc"
import { messagesRouter } from "./messages"
import { usersRouter } from "./users"
// import { filesRouter } from "./files"

export const appRouter = router({
    messages: messagesRouter,
    users: usersRouter,
    // files: filesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
