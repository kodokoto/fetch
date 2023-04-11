import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { Day, TimeOfDay, BookingFrequency, BookingStatus } from '@prisma/client'

export const bookingRouter = router({
  all: publicProcedure.query(() => {
    return prisma.booking.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.booking.findFirst({ where: { id: input } })
  }),
  byOwnerId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.booking.findMany({
      where: {
        ownerId: input,
      },
    })
  }),
  bySitterId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.booking.findMany({
      where: {
        sitterId: input,
      },
    })
  }),
  create : publicProcedure
    .input(z.object({
      ownerId: z.string(),
      sitterId: z.string(),
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
      }),
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
    }),
