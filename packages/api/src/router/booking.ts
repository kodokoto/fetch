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
  byIdWithScheduledTime: publicProcedure
  .input(
    z.object({
      id: z.number(),
      include: z.enum(['scheduledTime'])
    })
  )
  .query(({ input }) => {
    return prisma.booking.findFirst({
      where: { 
        id: input.id,
      },
      include: {
        scheduledTime: input.include.includes('scheduledTime')
      }
    })
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
  update: publicProcedure
    .input(z.object({
      id: z.number(),
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
      return await prisma.booking.update({
        where: {
          id: input.id,
        },
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
    }
  ),
  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    return await prisma.booking.delete({
      where: {
        id: input,
      },
    })
  }
  ),
  updateStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      status: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.booking.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status as BookingStatus,
        },
      })
    }
  ),
})