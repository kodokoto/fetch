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

function parseFrequencyStringToEnum(frequency: string): BookingFrequency {
  switch (frequency) {
    case 'one-off':
      return 'ONE_OFF'
    case 'every week':
      return 'WEEKLY'
    case 'every two weeks':
      return 'BI_WEEKLY'
    case 'every month':
      return 'MONTHLY'
    default:
      return 'ONE_OFF'
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
