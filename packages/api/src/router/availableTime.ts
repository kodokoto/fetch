import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma, BookingFrequency } from 'db'


function parseFrequencyStringToEnum(frequency: string): BookingFrequency {
  switch (frequency) {
    case 'one-off':
      return BookingFrequency.ONE_OFF
    case 'every week':
      return BookingFrequency.WEEKLY
    case 'every two weeks':
      return BookingFrequency.BI_WEEKLY
    case 'every month':
      return BookingFrequency.MONTHLY
    default:
      return BookingFrequency.ONE_OFF
  }
}

export const availableTimeRouter = router({
  all: publicProcedure.query(() => {
    return prisma.availableTime.findMany()
  }),
  bySitterId: publicProcedure.input(z.number()).query(({ input }) => {
    return prisma.availableTime.findMany({
      where: {
        sitterId: input,
      },
    })
  }),
})
