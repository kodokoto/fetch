import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'
import clerk from '@clerk/clerk-sdk-node'

const getUser = async (userId: string) => {
  const user = await clerk.users.getUser(userId);
  return user;
}


export const ownerRouter = router({
  all: publicProcedure.query(() => {
    return prisma.owner.findMany()
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
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
  contacts: publicProcedure
    .input(z.number())
    .query(({ input }) => {
      return prisma.sitter.findMany({
        where: {
          messages: {
            some: {
              ownerId: input,
            },
          }
        },
    })
  }),
  contactsByUserId: publicProcedure
    .input(z.string())
    .query(({ input }) => {
      return prisma.sitter.findMany({
        where: {
          messages: {
            some: {
              owner: {
                userId: input,
              },
            },
          }
        },
    })
  }),
  create: publicProcedure
    .input(z.object({ 
      userId: z.string(),
      name: z.string(),
      imageUrl: z.string(),
    }))
    .mutation( async ({ input }) => {
      return await prisma.owner.create({
        data: {
          userId: input.userId,
          name: input.name,
          imageUrl: input.imageUrl,
        },
      })
    })
})
