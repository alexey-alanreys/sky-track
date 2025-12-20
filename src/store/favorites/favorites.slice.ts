import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { loadFavorites } from './favorites.storage';

interface IFavoritesState {
	items: string[];
}

const initialState: IFavoritesState = {
	items: loadFavorites()
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite(state, action: PayloadAction<string>) {
			if (!state.items.includes(action.payload)) {
				state.items.push(action.payload);
			}
		},
		removeFavorite(state, action: PayloadAction<string>) {
			state.items = state.items.filter((id) => id !== action.payload);
		},
		clearFavorites(state) {
			state.items = [];
		}
	}
});

export const { addFavorite, removeFavorite, clearFavorites } =
	favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
