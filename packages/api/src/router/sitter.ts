import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "db";


export const sitterRouter = router({
  all: publicProcedure.query(() => {
    return prisma.user.findMany({
      where: {
        role: "SITTER"
      }
    });
  }),
  byEmail: publicProcedure.input(z.string()).query(({ input }) => {
    return prisma.user.findFirst({ 
      where: { 
        email: input,
        role: "SITTER"
      } 
    });
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.user.findFirst({ 
      where: { 
        id: input,
        role: "SITTER"
      } 
    });
  }),
});
