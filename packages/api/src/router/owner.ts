import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "db";

export const ownerRouter = router({
  all: publicProcedure.query(() => {
    return prisma.user.findMany({
      where: {
        role: "OWNER",
      },
    });
  }),
  byEmail: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.user.findFirst({ where: { email: input, role: "OWNER" } });
  }),
});
