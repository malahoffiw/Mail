import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
// import dayjs from "dayjs"

export const filesRouter = router({
    // getFiles: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    //     return ctx.prisma.file
    //         .findMany({
    //             where: {
    //                 messageId: input,
    //             },
    //             select: {
    //                 id: true,
    //                 createdAt: true,
    //                 name: true,
    //                 data: true,
    //             },
    //             orderBy: {
    //                 createdAt: "desc",
    //             },
    //         })
    //         .then((files) => {
    //             return files.map((file) => {
    //                 return {
    //                     ...file,
    //                     createdAt: dayjs(file.createdAt),
    //                     // data: Buffer.from(file.data).toString("base64"), ????
    //                 }
    //             })
    //         })
    // }),
    // createFile: protectedProcedure
    //     .input(
    //         z.object({
    //             messageId: z.string(),
    //             name: z.string(),
    //             data: z.instanceof(File), // Buffer.from(file.data).toString("base64") ?
    //         })
    //     )
    //     .mutation(({ ctx, input }) => {
    //         return ctx.prisma.file.create({
    //             data: {
    //                 name: input.name,
    //                 data: input.data, // todo
    //                 messageId: input.messageId,
    //             },
    //         })
    //     }),
    deleteFile: protectedProcedure
        .input(z.string())
        .mutation(({ ctx, input }) => {
            return ctx.prisma.file.delete({
                where: {
                    id: input,
                },
            })
        }),
})
