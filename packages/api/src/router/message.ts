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
        ownerId: z.number(),
        sitterId: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.message.findMany({
        where: {
          OR: [
            { ownerId: input.ownerId, sitterId: input.sitterId },
            { ownerId: input.sitterId, sitterId: input.ownerId },
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
        ownerId: z.number(),
        sitterId: z.number(),
        content: z.string(),
      })
    )
    .mutation(({ input }) => {
      // console.log("create message");
      return prisma.message.create({
        data: {
          ownerId: input.ownerId,
          sitterId: input.sitterId,
          content: input.content,
        },
      })
    }),
  latestBetweenUsers: publicProcedure
    .input(
      z.object({
        ownerId: z.number(),
        sitterId: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.message.findFirst({
        where: {
          OR: [
            { ownerId: input.ownerId, sitterId: input.sitterId },
            { ownerId: input.sitterId, sitterId: input.ownerId },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      })
    }),
})
