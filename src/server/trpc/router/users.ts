import { z } from "zod"
import { protectedProcedure, publicProcedure, router } from "../trpc"

export const usersRouter = router({
    getNames: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.prisma.user.findMany({
            select: {
                name: true,
            },
        })

        return users.map((user) => user.name)
    }),
    updateName: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    name: input,
                },
            })
        }),
})
