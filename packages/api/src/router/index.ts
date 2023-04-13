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
import { animalRouter } from './animal'
import { locationRouter } from './location'
import { imageRouter } from './image'
import { reviewRouter } from './review'


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
  scheduledTime: scheduledTimeRouter,
  animal: animalRouter,
  location: locationRouter,
  image: imageRouter,
  review: reviewRouter
})

export type AppRouter = typeof appRouter
