import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, BookingFrequency } from '@prisma/client'

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

export const serviceRouter = router({
    all: publicProcedure.query(() => {
        return prisma.service.findMany()
      }),
  bySitterId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.service.findFirst({
      where: {
        sitterId: input,
      },
    })
  }),
  byService: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.service.findFirst({
        where: {
          type: parseServiceStringToEnum(input) as ServiceType,
        },
      })
  })
})
