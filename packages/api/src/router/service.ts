import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, TimeOfDay, Day, PetType } from '@prisma/client'

export const serviceRouter = router({
  all: publicProcedure.query(() => {
    return prisma.service.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.service.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byIdWith: publicProcedure
    .input(
      z.object({
        id: z.number(),
        include: z.array(z.string()),
      })
    )
    .query(({ input }) => {
      return prisma.service.findFirst({
        where: {
          id: input.id,
        },
        include: {
          petTypes: input.include.includes('petTypes'),
          availableTimes: input.include.includes('availableTimes'),
        }
      })
    }),
  byBookingId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.service.findFirst({
      where: {
        bookings: {
          some: {
            id: input
          }
        }
      },
    })
  }),
  bySitterId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.service.findMany({
      where: {
        sitterId: input,
      },
      include: {
        petTypes: true,
      }
    })
  }),
  bySitterIdAndAvailableTime: publicProcedure
    .input(
      z.object({
        sitterId: z.string(),
        day: z.string(),
        time: z.string(),
      })
    )
    .query(({ input }) => {
      return prisma.service.findMany({
        where: {
          sitterId: input.sitterId,
          availableTimes: {
            some: {
              AND: [{ day: input.day as Day }, { time: input.time as TimeOfDay }],
            },
          },
        },
      })
    }),
  byServiceType: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.service.findFirst({
      where: {
        type: input as ServiceType,
      },
    })
  }),
  bySearchParams: publicProcedure
    .input(
      z.object({
        day: z.string(),
        serviceType: z.string(),
        timeOfDay: z.string(),
        maxPrice: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.service.findMany({
        where: {
          type: input.serviceType as ServiceType,
          price: {
            lte: input.maxPrice,
          },
          availableTimes: {
            some: {
              AND: [{ day: input.day as Day }, { time: input.timeOfDay as TimeOfDay }],
            },
          },
        },
      })
    }),
    create: publicProcedure
    .input(
      z.object({
        sitterId: z.string(),
        serviceType: z.string(),
        price: z.number(),
        petTypes: z.array(z.string()),
        description: z.string(),
        duration: z.number(),
        availableTimes: z.array(
          z.object({
            day: z.string(),
            time: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.service.create({
        data: {
          Sitter: {
            connect: {
              id: input.sitterId,
            }
          },
          duration: input.duration,
          description: input.description,
          petTypes: {
            create: input.petTypes.map((petType) => ({
              type: petType as PetType,
            })),
          },
          type: input.serviceType as ServiceType,
          price: input.price,
          availableTimes: {
            create: input.availableTimes.map((time) => ({
              day: time.day as Day,
              time: time.time as TimeOfDay,
            })),
          },
        },
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
        serviceType: z.string(),
        price: z.number(),
        petTypes: z.array(z.string()),
        description: z.string(),
        duration: z.number(),
        availableTimes: z.array(
          z.object({
            day: z.string(),
            time: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.service.update({
        where: {
          id: input.serviceId,
        },
        data: {
          duration: input.duration,
          description: input.description,
          petTypes: {
            create: input.petTypes.map((petType) => ({
              type: petType as PetType,
            })),
          },

          type: input.serviceType as ServiceType,
          price: input.price,
          availableTimes: {
            create: input.availableTimes.map((time) => ({
              day: time.day as Day,
              time: time.time as TimeOfDay,
            })),
          },
        },
      })
    }),
    delete: publicProcedure
    .input(
      z.object({
        serviceId: z.number(),
      }))
    .mutation(async ({ input }) => {
      return await prisma.service.delete({
        where: {
          id: input.serviceId,
        },
      })
    })
})
