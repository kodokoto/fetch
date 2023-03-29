import { router } from "../trpc";
import { bookingRouter } from "./booking";
import { authRouter } from "./auth";

export const appRouter = router({
  booking: bookingRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
