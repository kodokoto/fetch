import { router } from '../trpc'
import { bookingRouter } from './booking'
import { ownerRouter } from './owner'
import { sitterRouter } from './sitter'
import { messageRouter } from './message'
import { userRouter } from './user'
import { serviceRouter } from './service'
import { availableTimeRouter } from './availableTime'
import { petRouter } from './pet'
import { scheduledTimeRouter } from './scheduledTime'

export const appRouter = router({
  booking: bookingRouter,
  owner: ownerRouter,
  sitter: sitterRouter,
  message: messageRouter,
  user: userRouter,
  service: serviceRouter,
  availableTime: availableTimeRouter,
  pet: petRouter,
  scheduledTime: scheduledTimeRouter
})

export type AppRouter = typeof appRouter
