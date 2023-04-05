import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

export const messageRouter = router({
  all: publicProcedure.query(() => {
    return prisma.booking.findMany()
  }),
  betweenUsers: publicProcedure
    .input(
      z.object({
        senderId: z.number(),
        receiverId: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.message.findMany({
        where: {
          OR: [
            { senderId: input.senderId, receiverId: input.receiverId },
            { senderId: input.receiverId, receiverId: input.senderId },
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
        // return an object where
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        senderId: z.number(),
        receiverId: z.number(),
        content: z.string(),
      })
    )
    .mutation(({ input }) => {
      // console.log("create message");
      return prisma.message.create({
        data: {
          senderId: input.senderId,
          receiverId: input.receiverId,
          content: input.content,
        },
      })
    }),
  latestBetweenUsers: publicProcedure
    .input(
      z.object({
        senderId: z.number(),
        receiverId: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.message.findFirst({
        where: {
          OR: [
            { senderId: input.senderId, receiverId: input.receiverId },
            { senderId: input.receiverId, receiverId: input.senderId },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      })
    }),
})
