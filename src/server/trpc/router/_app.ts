import { router } from "../trpc"
import { messagesRouter } from "./messages"
import { usersRouter } from "./users"

export const appRouter = router({
    messages: messagesRouter,
    users: usersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
