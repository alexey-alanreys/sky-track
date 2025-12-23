import { createTRPCReact } from '@trpc/react-query';

import type {
	TAppRouter,
	TRouterOutput
} from '../../backend/src/trpc/types.js';

export const trpc = createTRPCReact<TAppRouter>();
export type { TRouterOutput };
