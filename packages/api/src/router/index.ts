import { router } from '../trpc'
import { bookingRouter } from './booking'
import { ownerRouter } from './owner'
import { sitterRouter } from './sitter'
import { messageRouter } from './message'
import { userRouter } from './user'
import { serviceRouter } from './service'
import { petRouter } from './pet'
import { reportRouter } from './report'


export const appRouter = router({
  booking: bookingRouter,
  owner: ownerRouter,
  sitter: sitterRouter,
  message: messageRouter,
  user: userRouter,
  service: serviceRouter,
  pet: petRouter,
  report: reportRouter
})

export type AppRouter = typeof appRouter
