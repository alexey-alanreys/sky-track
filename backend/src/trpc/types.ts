// backend/src/trpc/types.ts
import type { inferRouterOutputs } from '@trpc/server';

import type { TAppRouter } from './index.js';

export type TRouterOutput = inferRouterOutputs<TAppRouter>;
