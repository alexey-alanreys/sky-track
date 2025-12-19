import { FlightCard } from './FlightCard';
import { FLIGHTS } from './flights.data';

export const FlightList = () => {
	return (
		<div className='m-7 w-sm space-y-4'>
			{FLIGHTS.map(flight => (
				<FlightCard key={flight.id} flight={flight} />
			))}
		</div>
	);
};
