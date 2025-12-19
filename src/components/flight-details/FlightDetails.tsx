import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { QUERY_PARAM_FLIGHT } from '@/components/flight-list/flights.constants';
import { FLIGHTS } from '@/components/flight-list/flights.data';

import { FlightActions } from './FlightActions';
import { FlightHeader } from './FlightHeader';
import { FlightImage } from './FlightImage';
import { FlightInformation } from './FlightInformation';
import { FlightRoute } from './FlightRoute';
import { FlightSchedule } from './FlightSchedule';
import { FlightStatus } from './FlightStatus';

export const FlightDetails = () => {
	const [searchParams] = useSearchParams();
	const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);

	const flight = useMemo(
		() => FLIGHTS.find(flight => flight.id === selectedFlight),
		[selectedFlight]
	);

	if (!flight) return null;

	return (
		<aside className='absolute top-1/2 right-7 w-sm -translate-y-1/2 overflow-hidden rounded-xl bg-[#101010]'>
			<FlightHeader flight={flight} />
			<FlightImage flight={flight} />

			<div className='p-3.5'>
				<FlightRoute flight={flight} />
				<FlightStatus />
				<FlightSchedule />

				<FlightInformation flight={flight} />
				<FlightActions
					onRoute={() => {}}
					onFollow={() => {}}
					onShare={() => {}}
					onMore={() => {}}
				/>
			</div>
		</aside>
	);
};
