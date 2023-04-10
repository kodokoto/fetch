import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

export const petRouter = router({
  all: publicProcedure.query(() => {
    return prisma.pet.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.pet.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byOwnerId: publicProcedure
        .input(z.string())
        .query(({ input }) => {
            return prisma.pet.findMany({
                where: {
                    ownerId: input,
                },
            })
  }),
  byBookingId: publicProcedure.input(z.number()).query(({input})=> {
    return prisma.pet.findMany({
      where: {
        bookings: {
          some: {
            id: input
          }
        }
      },
    })
  }),
})