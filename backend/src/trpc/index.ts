import type { inferRouterOutputs } from '@trpc/server';

import { flightsRouter } from './routers/flights.router.js';
import { router } from './trpc.js';

// backend/src/trpc/index.ts
export const appRouter = router({
	flights: flightsRouter,
});

export type TAppRouter = typeof appRouter;
export type TRouterOutput = inferRouterOutputs<TAppRouter>;
