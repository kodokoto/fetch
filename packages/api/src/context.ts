import * as trpcExpress from '@trpc/server/adapters/express';
import { type inferAsyncReturnType } from "@trpc/server";

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
export type Context = inferAsyncReturnType<typeof createContext>;

    
    
  