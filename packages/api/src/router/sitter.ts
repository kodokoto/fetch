import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, TimeOfDay, Day } from '@prisma/client'

export const sitterRouter = router({
  all: publicProcedure.query(() => {
    return prisma.sitter.findMany()
  }),
  byId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.sitter.findFirst({
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
      return prisma.sitter.findFirst({
        where: {
          id: input.id,
        },
        include: {
          images: input.include.includes('images'),
          services: input.include.includes('services'),
          reviews: input.include.includes('reviews'),
        },
      })
    }),
  byUserId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.sitter.findFirst({
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
            sitterId: input,
          },
        },
      },
    })
  }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        imageUrl: z.string(),
        bio: z.string(),
        proximityRadius: z.number(),
        location: z.string(),
        description: z.string(),

      })
    )
    .mutation(async ({ input }) => {
      return await prisma.sitter.create({
        data: {
          userId: input.userId,
          name: input.name,
          imageUrl: input.imageUrl,
          bio: input.bio,
          proximityRadius: input.proximityRadius,
          location: input.location,
          description: input.description,
        },
      })
    }),
    
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        imageUrl: z.string(),
        bio: z.string(),
        proximityRadius: z.number(),
        location: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.sitter.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          bio: input.bio,
          proximityRadius: input.proximityRadius,
          location: input.location,
          description: input.description,
        },
      })
    }),
})
