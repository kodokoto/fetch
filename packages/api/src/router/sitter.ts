import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, BookingFrequency, TimeOfDay, Day } from '@prisma/client'

function parseServiceStringToEnum(service: string): ServiceType {
  switch (service) {
    case 'walk':
      return 'WALK'
    case 'petcare':
      return 'PET_CARE'
    case 'house_sitting':
      return 'HOUSE_SITTING'
    default:
      return 'WALK'
  }
}

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
        id: z.number(),
        date: z.string(),
        service: z.string(),
        availability: z.string(),
        maxPrice: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.sitter.findMany({
        where: {
          id: input.id,
          services: {
            some: {
              type: parseServiceStringToEnum(input.service),
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
