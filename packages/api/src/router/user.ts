import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import clerk from '@clerk/clerk-sdk-node';

const getUser = async (userId: string) => {
  const user = await clerk.users.getUser(userId);
  return user;
}

export const userRouter = router({
  all: publicProcedure.query(() => {
    return clerk.users.getUserList()
  }),
  byId: publicProcedure.input(z.string()).query(({ input }) => {
    return getUser(input)
  }),    
})
