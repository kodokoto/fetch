import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

export const userRouter = router({
  all: publicProcedure.query(() => {
    return prisma.user.findMany()
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
