import { FlightDetails } from '@/components/flight-details/FlightDetails';
import { FlightList } from '@/components/flight-list/FlightList';

export const Home = () => {
	return (
		<div>
			<FlightList />
			<FlightDetails />
		</div>
	);
};
