import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import clerk from '@clerk/clerk-sdk-node'

export const ownerRouter = router({
  all: publicProcedure.query(() => {
    return prisma.owner.findMany()
  }),
  byId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.owner.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byIdWith: publicProcedure
    .input(
      z.object({
        id: z.string(),
        include: z.array(z.enum(['images', 'services', 'reviews'])),
      })
    )
    .query(({ input }) => {
      return prisma.owner.findFirst({
        where: {
          id: input.id,
        },
        include: {
        },
      })
    }),
  byUserId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.owner.findFirst({
      where: {
        userId: input,
      },
    })
  }),
  contacts: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.owner.findMany({
      where: {
        messages: {
          some: {
            ownerId: input,
          },
        },
      },
    })
  }),

  bySearchParams: publicProcedure
    .input(
      z.object({
        serviceType: z.string(),
        timeOfDay: z.string(),
        day: z.string(),
        maxPrice: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.owner.findMany({
        where: {
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        imageUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.owner.create({
        data: {
          userId: input.userId,
          name: input.name,
          imageUrl: input.imageUrl,
        },
      })
    }),
})
