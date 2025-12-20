import { createListenerMiddleware } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';

import { addFavorite, clearFavorites, removeFavorite } from './favorites.slice';
import { saveFavorites } from './favorites.storage';

export const favoritesListener = createListenerMiddleware();

favoritesListener.startListening({
	matcher: (action) =>
		addFavorite.match(action) ||
		removeFavorite.match(action) ||
		clearFavorites.match(action),
	effect: (_, api) => {
		const state = api.getState() as RootState;
		saveFavorites(state.favorites.items);
	}
});
