import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { Day, TimeOfDay, BookingFrequency } from '@prisma/client'

export const scheduledTimeRouter = router({
  all: publicProcedure.query(() => {
    return prisma.scheduledTime.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.scheduledTime.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byBookingId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.scheduledTime.findFirst({
      where: {
        bookingId: input,
      },
    })
  }),
  create: publicProcedure
    .input(
      z.object({
        time: z.string(),
        day: z.string(),
        bookingId: z.number(),
        frequency: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.scheduledTime.create({
        data: {
          time: input.time as TimeOfDay,
          day: input.day as Day,
          bookingId: input.bookingId,
          frequency: input.frequency as BookingFrequency,
        },
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        time: z.string(),
        day: z.string(),
        frequency: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.scheduledTime.update({
        where: {
          id: input.id,
        },
        data: {
          time: input.time as TimeOfDay,
          day: input.day as Day,
          frequency: input.frequency as BookingFrequency,
        },
      })
    }),
})
