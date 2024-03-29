import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import { PetType } from '@prisma/client'

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
  create : publicProcedure
    .input(z.object({
      name: z.string(),
      type: z.string(),
      ownerId: z.string(),
      imageUrl: z.string(),
      description: z.string()
    }))
    .mutation(async ({ input }) => {
      return await prisma.pet.create({
        data: {
          name: input.name,
          type: input.type as PetType,
          imageUrl: input.imageUrl,
          owner: {
            connect: {
              id: input.ownerId
            }
          },
          description: input.description,
        }
      })
    }),
    delete: publicProcedure
      .input(z.object({
        id: z.number()
      }))
      .mutation(async ({ input }) => {
        return await prisma.pet.delete({
          where: {
            id: input.id
          }
        })
    }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string(),
        type: z.string(),
        imageUrl: z.string(),
        description: z.string()
      }))
      .mutation(async ({ input }) => {
        return await prisma.pet.update({
          where: {
            id: input.id
          },
          data: {
            name: input.name,
            type: input.type as PetType,
            imageUrl: input.imageUrl,
            description: input.description
          }
        })
    })
})