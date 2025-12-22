import { useEffect, useMemo, useState } from 'react';

import { SkeletonLoader } from '@/components/custom-ui/SkeletonLoader';
import { Filters } from '@/components/filters/Filters';

import { FlightCard } from './FlightCard';
import { FLIGHTS } from './flights.data';

export const FlightList = () => {
	const [fromCountry, setFromCountry] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const filteredFlights = useMemo(() => {
		if (!fromCountry) return FLIGHTS;
		return FLIGHTS.filter((flight) => flight.from.country === fromCountry);
	}, [fromCountry]);

	return (
		<div className='xs:w-full w-sm'>
			<Filters fromCountry={fromCountry} setFromCountry={setFromCountry} />

			<div className='space-y-4'>
				{isLoading ? (
					<SkeletonLoader count={5} className='mb-4 h-43.5' />
				) : (
					!!filteredFlights.length &&
					filteredFlights.map((flight) => (
						<FlightCard key={flight.id} flight={flight} />
					))
				)}
			</div>
		</div>
	);
};
