import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "db";

export const ownerRouter = router({
  all: publicProcedure.query(() => {
    return prisma.owner.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.owner.findFirst({
      where: {
        id: input
      }
    });
  })
});