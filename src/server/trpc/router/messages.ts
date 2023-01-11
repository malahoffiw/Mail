import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
import type { User } from "next-auth"
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
                createdAt: "desc",
            },
        })

        const inbox = []

        for (const message of messages) {
            const author = await ctx.prisma.user.findUnique({
                where: {
                    id: message.authorId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            })

            inbox.push({
                ...message,
                author: author as User,
                recipient: ctx.session.user,
                createdAt: message.createdAt.toISOString(),
                replyToId: message.replyToId ?? null,
                files: message.files.map((file) => file.id),
            })
        }

        return inbox
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
                createdAt: "desc",
            },
        })

        const sent = []

        for (const message of messages) {
            const recipient = await ctx.prisma.user.findUnique({
                where: {
                    id: message.recipientId as string,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            })

            sent.push({
                ...message,
                recipient: recipient,
                author: ctx.session.user,
                recipientId: message.recipientId as string,
                createdAt: message.createdAt.toISOString(),
                replyToId: message.replyToId ?? null,
                files: message.files.map((file) => file.id),
            })
        }

        return sent
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
                subject: true,
                body: true,
                createdAt: true,
                starred: true,
                replyToId: true,
                files: true,
                recipientId: true,
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        const drafts = []

        for (const message of messages) {
            if (!message.recipientId) {
                drafts.push({
                    ...message,
                    recipient: null,
                    recipientId: message.recipientId,
                    author: ctx.session.user,
                    createdAt: message.createdAt.toISOString(),
                    replyToId: message.replyToId ?? null,
                    files: message.files.map((file) => file.id),
                })

                continue
            }

            const recipient = await ctx.prisma.user.findUnique({
                where: {
                    id: message.recipientId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            })

            drafts.push({
                ...message,
                recipient: recipient,
                author: ctx.session.user,
                recipientId: message.recipientId as string,
                createdAt: message.createdAt.toISOString(),
                replyToId: message.replyToId ?? null,
                files: message.files.map((file) => file.id),
            })
        }

        return drafts
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
                authorId: true,
                read: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })

        const trash = []

        for (const message of messages) {
            // was draft
            if (!message.recipientId) {
                trash.push({
                    ...message,
                    recipient: null,
                    recipientId: message.recipientId,
                    author: ctx.session.user,
                    createdAt: message.createdAt.toISOString(),
                    replyToId: message.replyToId ?? null,
                    files: message.files.map((file) => file.id),
                })

                continue
            }

            // was inbox
            if (message.recipientId === ctx.session.user.id) {
                const author = await ctx.prisma.user.findUnique({
                    where: {
                        id: message.authorId,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                })

                trash.push({
                    ...message,
                    recipient: ctx.session.user,
                    author: author as User,
                    createdAt: message.createdAt.toISOString(),
                    replyToId: message.replyToId ?? null,
                    files: message.files.map((file) => file.id),
                })

                continue
            }

            // was sent
            const recipient = await ctx.prisma.user.findUnique({
                where: {
                    id: message.recipientId,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            })

            trash.push({
                ...message,
                author: ctx.session.user,
                recipient,
                createdAt: message.createdAt.toISOString(),
                replyToId: message.replyToId ?? null,
                files: message.files.map((file) => file.id),
            })
        }

        return trash
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
                replyToId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.message.update({
                where: {
                    id: input.id,
                },
                data: {
                    subject: input.subject,
                    body: input.body,
                    recipientId: input.recipientId,
                    files: {
                        connect: [].map((fileId) => ({ id: fileId })), // [] -> input.files
                    },
                    replyToId: input.replyToId,
                },
            })
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
        .mutation(({ ctx, input }) => {
            return ctx.prisma.message.delete({
                where: {
                    id: input,
                },
            })
        }),
})
