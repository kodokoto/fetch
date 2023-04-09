import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, BookingFrequency, TimeOfDay, Day } from '@prisma/client'

export const sitterRouter = router({
  all: publicProcedure.query(() => {
    return prisma.sitter.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.sitter.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byIdWithImages: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.sitter.findFirst({
      where: {
        id: input,
      },
      include: {
        images: true,
      },
    })
  }),
  byIdWith: publicProcedure
    .input(
      z.object({
        id: z.number(),
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
  contacts: publicProcedure.input(z.number()).query(({ input }) => {
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

  bySearchParams: publicProcedure
    .input(
      z.object({
        date: z.string(),
        service: z.string(),
        availability: z.string(),
        maxPrice: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.sitter.findMany({
        where: {
          services: {
            some: {
              type: input.service as ServiceType,
              price: {
                lte: input.maxPrice,
              },
              availableTimes: {
                some: {
                  AND: [{ day: input.date as Day }, { time: input.availability as TimeOfDay }],
                },
              },
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
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.sitter.create({
        data: {
          userId: input.userId,
          name: input.name,
          imageUrl: input.imageUrl,
        },
      })
    }),
})
