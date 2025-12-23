// backend/src/trpc/server.ts
import { flightsRouter } from './routers/flights.router.js';
import { router } from './trpc.js';

export const appRouter = router({
	flights: flightsRouter,
});

export type TAppRouter = typeof appRouter;
