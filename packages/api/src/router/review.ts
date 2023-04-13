import { router, publicProcedure } from '../trpc'
import { ReportType, prisma } from 'db'
import { z } from 'zod'

export const reviewRouter = router ({
    all: publicProcedure.query(() => {
        return prisma.report.findMany()
      }),

    create: publicProcedure
    .input(
      z.object({
        rating: z.number(),
        content: z.string(),
        fromId: z.string(),
        toId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.review.create({
        data: {
          rating: input.rating,
          content: input.content,
          fromId: input.fromId,
          toId: input.toId
        },
      })
    }), 
})