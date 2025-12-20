import { Heart } from '@/components/animate-ui/icons/heart';
import { Button } from '@/components/ui/button';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { addFavorite, removeFavorite } from '@/store/favorites';

interface Props {
	flightId: string;
}

export const FlightCardActions = ({ flightId }: Props) => {
	const dispatch = useAppDispatch();
	const favorites = useAppSelector((state) => state.favorites.items);

	const isFavorite = favorites.includes(flightId);

	const handleToggleFavorites = () => {
		if (isFavorite) {
			dispatch(removeFavorite(flightId));
		} else {
			dispatch(addFavorite(flightId));
		}
	};

	return (
		<div
			className={
				'absolute top-0.5 right-1 z-50 flex h-full origin-top-right scale-0 flex-col gap-2 px-3 opacity-0 transition-all duration-500 group-hover:-right-13.5 group-hover:scale-100 group-hover:opacity-100'
			}
		>
			<Button onClick={handleToggleFavorites} variant='ghost' size='icon'>
				<Heart
					fill={isFavorite ? 'var(--foreground)' : 'none'}
					className='size-5.5'
					animateOnHover
					animateOnTap
				/>
			</Button>
		</div>
	);
};
