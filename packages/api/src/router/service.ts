import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, TimeOfDay, Day } from '@prisma/client'

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
  bySitterIdArray: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.service.findMany({
      where: {
        sitterId: input,
      },
    })
  }),
  byService: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.service.findFirst({
      where: {
        type: input as ServiceType,
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
      return prisma.service.findMany({
        where: {
          type: input.service as ServiceType,
          price: {
            lte: input.maxPrice,
          },
          availableTimes: {
            some: {
              AND: [{ day: input.availability as Day }, { time: input.availability as TimeOfDay }],
            },
          },
        },
      })
    }),
})
