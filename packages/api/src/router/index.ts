import { router } from '../trpc';
import { bookingRouter } from './booking';
import { ownerRouter } from './owner';
import { sitterRouter } from './sitter';

export const appRouter = router({
    booking: bookingRouter,
    owner: ownerRouter,
    sitter: sitterRouter,
})

export type AppRouter = typeof appRouter;