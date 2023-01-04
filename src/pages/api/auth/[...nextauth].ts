import NextAuth, { type NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../server/db/client"
import { env } from "../../../env/server.mjs"

export const authOptions: NextAuthOptions = {
    pages: {
        // todo
        // signIn: "/auth/signin",
        // verifyRequest: "/auth/verify",
        // newUser: "/auth/signup",
    },
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id
            }
            return session
        },
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
}

export default NextAuth(authOptions)
