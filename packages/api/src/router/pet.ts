import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { prisma } from 'db'

export const petRouter = router({
    byOwnerId: publicProcedure
        .input(z.string())
        .query(({ input }) => {
            return prisma.pet.findMany({
                where: {
                    ownerId: input,
                },
            })
        })
})
