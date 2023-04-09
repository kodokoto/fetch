import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType } from '@prisma/client'
import { Day, TimeOfDay, BookingFrequency } from '@prisma/client'

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
  create : publicProcedure
    .input(z.object({
      ownerId: z.number(),
      sitterId: z.number(),
      serviceId: z.number(),
      petId: z.number(),
      scheduledTime: z.object({
        time: z.string(),
        day: z.string(),
        frequency: z.string(),
      }),
    }))
    .mutation(async ({ input }) => {
      return await prisma.booking.create({
        data: {
          owner: {
            connect: {
              id: input.ownerId,
            }
          },
          sitter: {
            connect: {
              id: input.sitterId,
            }
          },
          service: {
            connect: {
              id: input.serviceId,
            }
          },
          scheduledTime: {
            create: {
              time: input.scheduledTime.time as TimeOfDay,
              day: input.scheduledTime.day as Day,
              frequency: input.scheduledTime.frequency as BookingFrequency,
            },
          },
          pet: {
            connect: {
              id: input.petId,
            },
          },
        },
      })
    })
})
