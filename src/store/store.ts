import { configureStore } from '@reduxjs/toolkit';

import { favoritesListener, favoritesReducer } from './favorites';

export const store = configureStore({
	reducer: {
		favorites: favoritesReducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(favoritesListener.middleware);
	},
	devTools: import.meta.env.DEV
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
