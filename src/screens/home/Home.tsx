import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

// import { FlightDetails } from '@/components/flight-details/FlightDetails';
import { FlightList } from '@/components/flight-list/FlightList';

import { trpc } from '@/lib/trpc';

export const Home = () => {
	const { data, isLoading, error, refetch, isRefetching } =
		trpc.flights.getLive.useQuery({
			limit: 10
		});

	const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

	useEffect(() => {
		if (data && data.length > 0) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setLastUpdate(new Date());
		}
	}, [data]);

	const [searchParams] = useSearchParams();
	const selectedFlight = searchParams.get('flight');

	if (error) {
		return (
			<div className='text-red-500'>
				Error fetching live flights: {error.message}
			</div>
		);
	}

	if (isLoading) {
		return <div className='text-gray-500'>Loading live flights...</div>;
	}

	if (!data?.length) {
		return <div className='text-gray-500'>No live flights available.</div>;
	}

	const activeFlight = data.find((flight) => flight.id === selectedFlight);

	return (
		<div>
			<FlightList
				flights={data}
				lastUpdate={lastUpdate}
				isRefetching={isRefetching}
				isPending={isLoading}
				refetch={refetch}
			/>
			{/* {activeFlight && <FlightDetails flight={activeFlight} />} */}
		</div>
	);
};
