import { router, publicProcedure } from '../trpc'
import { prisma } from 'db'
import { z } from 'zod'
import clerk from '@clerk/clerk-sdk-node'

const getUser = async (userId: string) => {
  const user = await clerk.users.getUser(userId)
  return user
}

export const userRouter = router({
  all: publicProcedure.query(() => {
    return clerk.users.getUserList()
  }),
  getProfiles: publicProcedure.input(z.string()).query(async ({ input }) => {
    return {
      owner: await prisma.owner.findUnique({
        where: {
          userId: input,
        },
        select: {
          id: true,
        },
      }),
      sitter: await prisma.sitter.findUnique({
        where: {
          userId: input,
        },
        select: {
          id: true,
        },
      }),
    }
  }),
})
