import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, BookingFrequency } from '@prisma/client'

function parseServiceStringToEnum(service: string): ServiceType {
  switch (service) {
    case 'walk':
      return 'WALK'
    case 'pet_care':
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
  bySearchParams: publicProcedure
    .input(
      z.object({
        service: z.string(),
        proximity: z.string(),
        frequency: z.string(),
        date: z.string(),
      })
    )
    .query(({ input }) => {
      return prisma.sitter.findMany({
        where: {
          AND: [
            {
              services: {
                some: {
                  type: parseServiceStringToEnum(input.service) as ServiceType,
                },
              },
            },
            {
              availableTimes: {
                some: {
                  frequency: parseFrequencyStringToEnum(input.frequency),
                },
              },
            },
          ],
        },
      })
    }),
})
