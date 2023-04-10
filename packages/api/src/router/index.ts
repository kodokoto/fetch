import { router } from '../trpc'
import { bookingRouter } from './booking'
import { ownerRouter } from './owner'
import { sitterRouter } from './sitter'
import { messageRouter } from './message'
import { userRouter } from './user'
import { serviceRouter } from './service'
import { petRouter } from './pet'
import { reportRouter } from './report'
import { availableTimeRouter } from './availableTime'
import { scheduledTimeRouter } from './scheduledTime'


export const appRouter = router({
  booking: bookingRouter,
  owner: ownerRouter,
  sitter: sitterRouter,
  message: messageRouter,
  user: userRouter,
  service: serviceRouter,
  pet: petRouter,
  report: reportRouter,
  availableTime: availableTimeRouter,
  scheduledTime: scheduledTimeRouter
})

export type AppRouter = typeof appRouter
