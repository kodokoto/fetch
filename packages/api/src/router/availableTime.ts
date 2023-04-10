import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

export const availableTimeRouter = router({
  all: publicProcedure.query(() => {
    return prisma.availableTime.findMany()
  }),
  byServiceId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.availableTime.findMany({
      where: {
        serviceId: input,
      },
    })
  }),
})
