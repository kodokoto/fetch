import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, BookingFrequency } from '@prisma/client'
import { petRouter } from './pet'

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

export const bookingRouter = router({
  all: publicProcedure.query(() => {
    return prisma.booking.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.booking.findFirst({ where: { id: input } })
  }),
  byOwnerId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.booking.findMany({
      where: {
        ownerId: input,
      },
    })
  }),
  bySitterId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.booking.findMany({
      where: {
        sitterId: input,
      },
    })
  }),
  create: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        ownerId: z.number(),
        sitterId: z.number(),
        services: z.string(),
        frequency: z.string(),
        pets: z.array(z.object({
          id: z.number(),
        })
        ),
      })
    )
    .mutation(({ input }) => {
      const { startDate, ownerId, sitterId, services, frequency, pets } = input
      const parsedService = parseServiceStringToEnum(services)
      const parsedFrequency = parseFrequencyStringToEnum(frequency)

      return prisma.booking.create({
        data: {
          startDate,
          owner: {
            connect: {
              id: ownerId,
            },
          },
          sitter: {
            connect: {
              id: sitterId,
            },
          },
          services: parsedService,
          frequency: parsedFrequency,
          pets: {
            connect: pets.map((pet) => ({
              id: pet.id,
            })),
          },
        },
      })
    }),
})
