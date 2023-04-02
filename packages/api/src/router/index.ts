import { router } from '../trpc';
import { bookingRouter } from './booking';

export const appRouter = router({
    booking: bookingRouter,
})

export type AppRouter = typeof appRouter;