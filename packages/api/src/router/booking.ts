import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const bookingRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.booking.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.booking.findFirst({ where: { id: input } });
  }),
//   create: protectedProcedure
//     .input(z.object({ title: z.string(), content: z.string() }))
//     .mutation(({ ctx, input }) => {
//       return ctx.prisma.booking.create({ data: input });
//     }),
});
