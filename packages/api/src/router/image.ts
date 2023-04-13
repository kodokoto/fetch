import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { Day, TimeOfDay, BookingFrequency, BookingStatus } from '@prisma/client'

export const imageRouter = router({
  all: publicProcedure.query(() => {
    return prisma.image.findMany()
  }),
  bySitterId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.image.findMany({
      where: {
        sitterId: input,
      },
    })
  }),
  create : publicProcedure
    .input(z.object({
      url: z.string(),
      sitterId: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.image.create({
        data: {
          sitterId: input.sitterId,
          url: input.url
        },
      })
    }),
    updateStatusById: publicProcedure
    .input(z.object({
      bookingId: z.number(),
      status: z.string()
    }))
    .mutation(async ({ input }) => {
      return await prisma.booking.update({
        where: {
          id:  input.bookingId
        },
        data: {
          status: input.status as BookingStatus
        }
      })
    }),
    udateScheduledTime: publicProcedure
    .input(z.object({
      bookingId: z.number(),
      scheduledTime: z.object({
        time: z.string(),
        day: z.string(),
        frequency: z.string(),
      }),
    }))
    .mutation(async ({ input }) => {
      return await prisma.booking.update({
        where: {
          id: input.bookingId,
        },
        data: {
          scheduledTime: {
            update: {
              time: input.scheduledTime.time as TimeOfDay,
              day: input.scheduledTime.day as Day,
              frequency: input.scheduledTime.frequency as BookingFrequency,
            },
          },
        },
      })
    })
})