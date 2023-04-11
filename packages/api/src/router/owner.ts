import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import clerk from '@clerk/clerk-sdk-node'

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
  
  byIdWith: publicProcedure
    .input(
      z.object({
        id: z.string(),
        include: z.array(z.enum(['images', 'pets', 'reviews'])),
      })
    )
    .query(({ input }) => {
      return prisma.owner.findFirst({
        where: {
          id: input.id,
        },
        include: {
          // images: input.include.includes('images'),
          pets: input.include.includes('pets'),
          reviews: input.include.includes('reviews'),
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
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.owner.create({
        data: {
          userId: input.userId,
          name: input.name,
          imageUrl: input.imageUrl,
        },
      })
    }),
  
  update: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        id: z.string(),
        name: z.string(),
        imageUrl: z.string(),
        location : z.string(),
        description: z.string(),
      
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.owner.update({
        where: {
          userId: input.userId,
          id: input.id,
        },
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          location: input.location,
          description: input.description,
        },
      })
    }),

})
