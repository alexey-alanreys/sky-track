import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { RefreshCw } from '@/components/animate-ui/icons/refresh-cw';
import { SkeletonLoader } from '@/components/custom-ui/SkeletonLoader';
import { Filters } from '@/components/filters/Filters';
import { Button } from '@/components/ui/button';

import { FlightCard } from './FlightCard';
import { formatDate } from './format-date';
import aviationService from '@/services/external/aviation/aviation.service';

interface Props {
	setIcao24: (icao24: string[]) => void;
}

export const FlightList = ({ setIcao24 }: Props) => {
	const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
	const [fromCountry, setFromCountry] = useState<string | undefined>();
	const [currentAirline, setCurrentAirline] = useState<string | undefined>();

	const { data, isPending, refetch, isRefetching } = {
		data: undefined,
		isPending: true,
		refetch: () => null,
		isRefetching: false
	};

	// const { data, isPending, refetch, isRefetching } = useQuery({
	// 	queryKey: ['flights', fromCountry, currentAirline],
	// 	queryFn: async () => {
	// 		const result = await aviationService.fetchFlights({
	// 			airline: currentAirline,
	// 			fromCountry,
	// 			limit: 100
	// 		})

	// 		setLastUpdate(new Date())
	// 		return result
	// 	}
	// })

	useEffect(() => {
		if (!data?.data?.length) return;

		const icao24List = data.data
			.map((flight) => flight.flight.icao)
			.filter(Boolean);
		setIcao24(icao24List);
	}, [data, setIcao24]);

	return (
		<div className='relative z-10 w-sm sm:w-full md:w-xs'>
			<Filters
				fromCountry={fromCountry}
				setFromCountry={setFromCountry}
				currentAirline={currentAirline}
				setCurrentAirline={setCurrentAirline}
			/>

			<div className='absolute top-0 -right-12.5'>
				<Button
					onClick={() => refetch()}
					disabled={isRefetching}
					variant='secondary'
				>
					<RefreshCw animateOnHover />
				</Button>
			</div>

			{lastUpdate && (
				<div className='text-muted-foreground mt-3 text-center text-xs italic opacity-50'>
					{isRefetching ? (
						<>Updating...</>
					) : (
						<>Last update: {formatDate(lastUpdate)}</>
					)}
				</div>
			)}

			<div className='custom-scrollbar max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] space-y-4 overflow-x-hidden overflow-y-auto pt-3 pr-2 pb-8'>
				{isPending ? (
					<SkeletonLoader count={5} className='mb-4 h-40' />
				) : (
					!!data?.data.length &&
					data.data.map((flight) => (
						<FlightCard key={flight.flight.number} flight={flight} />
					))
				)}
			</div>
		</div>
	);
};
