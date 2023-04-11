import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
  
  export const scheduledTimeRouter = router({
    all: publicProcedure.query(() => {
      return prisma.scheduledTime.findMany()
    }),
    byBookingId: publicProcedure.input(z.number()).query(({ input }) => {
      return prisma.scheduledTime.findFirst({
        where: {
          bookingId: input,
        },
      })
    }),
  })