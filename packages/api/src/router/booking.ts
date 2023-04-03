import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "db";

export const bookingRouter = router({
  all: publicProcedure.query(() => {
    return prisma.booking.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.booking.findFirst({ where: { id: input } });
  }),
  byOwnerEmail: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.booking.findMany({
      where: {
        owner: {
          email: input,
        },
      },
    });
  }),
});
