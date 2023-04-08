import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

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
})
