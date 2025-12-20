import { useMemo } from 'react';

import { Heading } from '@/components/custom-ui/Heading';
import { SubHeading } from '@/components/custom-ui/SubHeading';
import { FlightCard } from '@/components/flight-list/FlightCard';
import { FLIGHTS } from '@/components/flight-list/flights.data';

import { useAppSelector } from '@/hooks/useAppSelector';

export const Favorites = () => {
	const favorites = useAppSelector((state) => state.favorites.items);

	const flights = useMemo(() => {
		return FLIGHTS.filter((flight) => favorites.includes(flight.id));
	}, [favorites]);

	return (
		<div className='mx-auto w-1/3'>
			<Heading>Favorites</Heading>
			<SubHeading>
				You can add flights to your favorites by clicking the heart icon on the
				flight details page. Once added, you can view and manage your favorite
				flights here.
			</SubHeading>

			<div className='grid grid-cols-2 gap-3'>
				{flights.map((flight) => (
					<FlightCard key={flight.id} flight={flight} />
				))}
			</div>
		</div>
	);
};
