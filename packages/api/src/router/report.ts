import { router, publicProcedure } from '../trpc'
import { ReportType, prisma } from 'db'
import { z } from 'zod'

export const reportRouter = router ({
    all: publicProcedure.query(() => {
        return prisma.report.findMany()
      }),

    create: publicProcedure
    .input(
      z.object({
        reportType: z.string(),
        reportContent: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.report.create({
        data: {
          reportType: input.reportType as ReportType,
          content: input.reportContent,
        },
      })
    }), 
})