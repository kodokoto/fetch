import { initTRPC } from '@trpc/server';
import { Context } from './context';

export const trpc = initTRPC.context<Context>().create();
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
