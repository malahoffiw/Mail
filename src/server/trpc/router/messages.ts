import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
import type {
    DraftMessage,
    InboxMessage,
    SentMessage,
} from "../../../types/message"

export const messagesRouter = router({
    getInbox: protectedProcedure.query(
        async ({ ctx }): Promise<InboxMessage[]> => {
            const messages = await ctx.prisma.message.findMany({
                where: {
                    recipientId: ctx.session.user.id,
                    isDraft: false,
                },
                select: {
                    id: true,
                    authorId: true,
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

            return messages.map((message) => {
                return {
                    ...message,
                    createdAt: message.createdAt.toISOString(),
                    replyToId: message.replyToId ?? null,
                    files: message.files.map((file) => file.id),
                }
            })
        }
    ),
    getSent: protectedProcedure.query(
        async ({ ctx }): Promise<SentMessage[]> => {
            const messages = await ctx.prisma.message.findMany({
                where: {
                    authorId: ctx.session.user.id,
                    isDraft: false,
                },
                select: {
                    id: true,
                    recipientId: true,
                    subject: true,
                    body: true,
                    createdAt: true,
                    starred: true,
                    replyToId: true,
                    files: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            })

            return messages.map((message) => {
                return {
                    ...message,
                    createdAt: message.createdAt.toISOString(),
                    files: message.files.map((file) => file.id),
                    recipientId: message.recipientId ?? "",
                }
            })
        }
    ),
    getDrafts: protectedProcedure.query(
        async ({ ctx }): Promise<DraftMessage[]> => {
            const drafts = await ctx.prisma.message.findMany({
                where: {
                    authorId: ctx.session.user.id,
                    isDraft: true,
                },
                select: {
                    id: true,
                    subject: true,
                    body: true,
                    createdAt: true,
                    starred: true,
                    replyToId: true,
                    files: true,
                },

                orderBy: {
                    createdAt: "desc",
                },
            })

            return drafts.map((draft) => {
                return {
                    ...draft,
                    createdAt: draft.createdAt.toISOString(),
                    files: draft.files.map((file) => file.id),
                }
            })
        }
    ),
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
        .mutation(({ ctx, input }) => {
            return ctx.prisma.message.create({
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
        .mutation(({ ctx, input }) => {
            return ctx.prisma.message.create({
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
        .mutation(({ ctx, input }) => {
            return ctx.prisma.message.update({
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
