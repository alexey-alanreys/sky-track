import { configureStore } from '@reduxjs/toolkit';

import { favoritesListener, favoritesReducer } from './favorites';
import { flightActionsReducer } from './flight-actions/flight-action.slice';

export const store = configureStore({
	reducer: {
		favorites: favoritesReducer,
		flightActions: flightActionsReducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(favoritesListener.middleware);
	},
	devTools: import.meta.env.DEV
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
