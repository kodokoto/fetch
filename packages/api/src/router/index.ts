import { router } from '../trpc'
import { bookingRouter } from './booking'
import { ownerRouter } from './owner'
import { sitterRouter } from './sitter'
import { messageRouter } from './message'
import { userRouter } from './user'

export const appRouter = router({
  booking: bookingRouter,
  owner: ownerRouter,
  sitter: sitterRouter,
  message: messageRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
