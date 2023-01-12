import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
import type { Message } from "../../../types/message"

export const messagesRouter = router({
    getInbox: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                recipientId: ctx.session.user.id,
                isDraft: false,
                deleted: false,
            },
            select: {
                id: true,
                authorId: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                recipientId: true,
                subject: true,
                body: true,
                createdAt: true,
                read: true,
                starred: true,
                replyToId: true,
                files: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            recipient: ctx.session.user,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
            files: message.files.map((file) => file.id),
        }))
    }),
    getSent: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                authorId: ctx.session.user.id,
                isDraft: false,
                deleted: false,
            },
            select: {
                id: true,
                recipientId: true,
                recipient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                authorId: true,
                subject: true,
                body: true,
                createdAt: true,
                starred: true,
                replyToId: true,
                files: true,
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            author: ctx.session.user,
            recipientId: message.recipientId as string,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
            files: message.files.map((file) => file.id),
        }))
    }),
    getDrafts: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                authorId: ctx.session.user.id,
                isDraft: true,
                deleted: false,
            },
            select: {
                id: true,
                authorId: true,
                recipientId: true,
                recipient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                subject: true,
                body: true,
                createdAt: true,
                starred: true,
                replyToId: true,
                files: true,
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            author: ctx.session.user,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
            files: message.files.map((file) => file.id),
        }))
    }),
    getTrash: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                OR: [
                    {
                        authorId: ctx.session.user.id,
                    },
                    {
                        recipientId: ctx.session.user.id,
                    },
                ],
                deleted: true,
            },
            select: {
                id: true,
                subject: true,
                body: true,
                createdAt: true,
                starred: true,
                replyToId: true,
                files: true,
                recipientId: true,
                recipient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                authorId: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
            files: message.files.map((file) => file.id),
        }))
    }),
    createMessage: protectedProcedure
        .input(
            z.object({
                subject: z.string(),
                body: z.string(),
                // files: z.array(z.string()), // todo
                recipientId: z.string(),
                replyToId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.message.create({
                data: {
                    subject: input.subject,
                    body: input.body,
                    authorId: ctx.session.user.id,
                    recipientId: input.recipientId,
                    files: {
                        connect: [].map((fileId) => ({ id: fileId })), // [] -> input.files
                    },
                    replyToId: input.replyToId,
                    read: false,
                },
            })
        }),
    createDraft: protectedProcedure
        .input(
            z.object({
                subject: z.string(),
                body: z.string(),
                // files: z.array(z.string()), // todo
                recipientId: z.string().optional(),
                replyToId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.message.create({
                data: {
                    subject: input.subject,
                    body: input.body,
                    authorId: ctx.session.user.id,
                    recipientId: input.recipientId,
                    files: {
                        connect: [].map((fileId) => ({ id: fileId })), // [] -> input.files
                    },
                    replyToId: input.replyToId,
                    isDraft: true,
                },
            })
        }),
    updateDraft: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                subject: z.string(),
                body: z.string(),
                // files: z.array(z.string()), // todo
                recipientId: z.string().optional(),
                isDraft: z.boolean(),
                // replyToId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const message = await ctx.prisma.message.update({
                where: {
                    id: input.id,
                },
                data: {
                    subject: input.subject,
                    body: input.body,
                    recipientId: input.recipientId,
                    isDraft: input.isDraft,
                    // replyToId: input.replyToId,
                },
                select: {
                    id: true,
                },
            })

            return message.id
        }),
    setDeleted: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            const message = await ctx.prisma.message.update({
                where: {
                    id: input,
                },
                data: {
                    deleted: true,
                },
                select: {
                    id: true,
                },
            })

            return message.id
        }),
    deleteMessage: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.message.delete({
                where: {
                    id: input,
                },
            })

            return input
        }),
})
