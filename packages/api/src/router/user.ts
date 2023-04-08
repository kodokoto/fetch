import { router, publicProcedure } from '../trpc'
import { prisma } from 'db'
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
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.user.findFirst({
      where: {
        id: input,
      },
    })
  }),
  byEmail: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.user.findFirst({
      where: {
        email: input,
      },
    })
  }),
  bySitterId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.user.findFirst({
      where: {
        sitterAccount: {
          id: {
            equals: input,
          },
        },
      },
    })
  }),
  // given the id of a user:
  // get all users that have received messages from the user
  // and get all users that have sent messages to the user
  // select the id, name and imageUrl of the users
  contacts: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.user.findMany({
      where: {
        OR: [
          {
            sentMessages: {
              some: {
                receiverId: input,
              },
            },
          },
          {
            receivedMessages: {
              some: {
                senderId: input,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    })
  }),
  contactsByEmail: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.user.findMany({
      where: {
        OR: [
          {
            sentMessages: {
              some: {
                receiver: {
                  email: input,
                },
              },
            },
          },
          {
            receivedMessages: {
              some: {
                sender: {
                  email: input,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    })
  }),
})
