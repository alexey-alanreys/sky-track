const LS_KEY = 'favorites';

export const loadFavorites = (): string[] => {
	if (typeof window === 'undefined') return [];

	try {
		const data = localStorage.getItem(LS_KEY);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error('Failed to load favorites', error);
		return [];
	}
};

export const saveFavorites = (favorites: string[]) => {
	localStorage.setItem(LS_KEY, JSON.stringify(favorites));
};
