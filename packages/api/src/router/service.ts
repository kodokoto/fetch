import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { ServiceType, TimeOfDay, Day, BookingFrequency, PetType } from '@prisma/client'

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
  bySitterId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.service.findFirst({
      where: {
        sitterId: input,
      },
    })
  }),
  bySitterIdAndAvailableTime: publicProcedure
    .input(
      z.object({
        sitterId: z.number(),
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
        date: z.string(),
        service: z.string(),
        availability: z.string(),
        maxPrice: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.service.findMany({
        where: {
          type: input.service as ServiceType,
          price: {
            lte: input.maxPrice,
          },
          availableTimes: {
            some: {
              AND: [{ day: input.availability as Day }, { time: input.availability as TimeOfDay }],
            },
          },
        },
      })
    }),
    create: publicProcedure
    .input(
      z.object({
        sitterId: z.number(),
        type: z.string(),
        price: z.number(),
        petType: z.string(),
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
          petType: input.petType as PetType,
          type: input.type as ServiceType,
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
})
