import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
import type { Message } from "../../../types/message"

export const messagesRouter = router({
    getUserTypeForMessageById: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const message = await ctx.prisma.message.findUnique({
                where: {
                    id: input,
                },
                select: {
                    authorId: true,
                    recipientId: true,
                },
            })

            if (!message) {
                return null
            }
            if (message.authorId === message.recipientId) {
                return "both"
            }
            if (message.authorId === ctx.session.user.id) {
                return "author"
            } else {
                return "recipient"
            }
        }),
    getInbox: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                recipientId: ctx.session.user.id,
                isDraft: false,
                trashByRecipient: false,
                deletedByRecipient: false,
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
                starredByRecipient: true,
                replyToId: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            starred: message.starredByRecipient,
            recipient: ctx.session.user,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
        }))
    }),
    getSent: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                authorId: ctx.session.user.id,
                isDraft: false,
                trashByAuthor: false,
                deletedByAuthor: false,
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
                starredByAuthor: true,
                replyToId: true,
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            starred: message.starredByAuthor,
            author: ctx.session.user,
            recipientId: message.recipientId as string,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
        }))
    }),
    getDrafts: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                authorId: ctx.session.user.id,
                isDraft: true,
                trashByAuthor: false,
                deletedByAuthor: false,
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
                starredByAuthor: true,
                replyToId: true,
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        return messages.map((message) => ({
            ...message,
            starred: message.starredByAuthor,
            author: ctx.session.user,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
        }))
    }),
    getTrash: protectedProcedure.query(async ({ ctx }): Promise<Message[]> => {
        const messages = await ctx.prisma.message.findMany({
            where: {
                OR: [
                    {
                        authorId: ctx.session.user.id,
                        trashByAuthor: true,
                        deletedByAuthor: false,
                    },
                    {
                        recipientId: ctx.session.user.id,
                        trashByRecipient: true,
                        deletedByRecipient: false,
                    },
                ],
            },
            select: {
                id: true,
                subject: true,
                body: true,
                createdAt: true,
                starredByRecipient: true,
                starredByAuthor: true,
                replyToId: true,
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
            starred: message.starredByAuthor || message.starredByRecipient,
            createdAt: message.createdAt.toISOString(),
            replyToId: message.replyToId ?? null,
        }))
    }),
    createMessage: protectedProcedure
        .input(
            z.object({
                subject: z.string(),
                body: z.string(),
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
                recipientId: z.string().optional(),
                isDraft: z.boolean(),
                replyToId: z.string().optional(),
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
                    replyToId: input.replyToId,
                },
                select: {
                    id: true,
                },
            })

            return message.id
        }),
    setStarredByAuthor: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                starred: z.boolean(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.message.update({
                where: {
                    id: input.id,
                },
                data: {
                    starredByAuthor: input.starred,
                },
            })

            return input
        }),
    setStarredByRecipient: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                starred: z.boolean(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.message.update({
                where: {
                    id: input.id,
                },
                data: {
                    starredByRecipient: input.starred,
                },
            })

            return input
        }),
    setTrashByAuthor: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.prisma.message.update({
            where: {
                id: input,
            },
            data: {
                trashByAuthor: true,
            },
        })

        return input
    }),
    setTrashByRecipient: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.prisma.message.update({
            where: {
                id: input,
            },
            data: {
                trashByRecipient: true,
            },
        })

        return input
    }),
    setDeletedByAuthor: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.prisma.message.update({
            where: {
                id: input,
            },
            data: {
                deletedByAuthor: true,
            },
        })

        return input
    }),
    setDeletedByRecipient: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.prisma.message.update({
            where: {
                id: input,
            },
            data: {
                deletedByRecipient: true,
            },
        })

        return input
    }),
    deleteMessage: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.prisma.message.delete({
            where: {
                id: input,
            },
        })

        return input
    }),
})
