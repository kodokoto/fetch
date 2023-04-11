import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import clerk from '@clerk/clerk-sdk-node'
import { PetType } from '@prisma/client'

const getUser = async (userId: string) => {
  const user = await clerk.users.getUser(userId)
  return user
}

export const ownerRouter = router({
  all: publicProcedure.query(() => {
    return prisma.owner.findMany()
  }),
  byId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.owner.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byUserId: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.owner.findFirst({
      where: {
        userId: input,
      },
    })
  }),
  contacts: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.sitter.findMany({
      where: {
        messages: {
          some: {
            ownerId: input,
          },
        },
      },
    })
  }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        imageUrl: z.string(),
        description: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.owner.create({
        data: {
          userId: input.userId,
          name: input.name,
          imageUrl: input.imageUrl,
          description: input.description,
          location: input.location,
        },
      })
    }),
    addPet: publicProcedure
    .input(
      z.object({
        ownerId: z.string(),
        pets: z.array(
          z.object({
            name: z.string(),
            type: z.string(),
            description: z.string(),
            imageUrl: z.string(),
        }))
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.owner.update({
        where: {
          id: input.ownerId,
        },
        data: {
          pets: {
            create: input.pets.map((pet) => ({
              name: pet.name,
              type: pet.type as PetType,
              description: pet.description,
              imageUrl: pet.imageUrl,
            }))
          }
        }
      })
    }), 
})
