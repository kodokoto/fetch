import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

export const animalRouter = router({
  all: publicProcedure.query(() => {
    return prisma.animal.findMany()
  }),
  byServiceId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.animal.findMany({
      where: {
        serviceId: input,
      },
    })
  }),
})
