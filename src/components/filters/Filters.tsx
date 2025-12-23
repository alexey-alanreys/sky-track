import { FLIGHTS } from '@/components/flight-list/flights.data';

import { FilterSearchSelect } from './FilterSearchSelect';

const fromCountries = [
	...new Set(FLIGHTS.map((flight) => flight.from.country))
];
const airlines = [...new Set(FLIGHTS.map((flight) => flight.airline.country))];

interface Props {
	fromCountry: string | undefined;
	setFromCountry: (country: string | undefined) => void;

	currentAirline: string | undefined;
	setCurrentAirline: (airline: string | undefined) => void;
}

export const Filters = ({
	fromCountry,
	setFromCountry,
	currentAirline,
	setCurrentAirline
}: Props) => {
	return (
		<div className='ml-1 grid grid-cols-2 gap-3'>
			<FilterSearchSelect
				data={fromCountries}
				entityName='country'
				value={fromCountry}
				onChange={setFromCountry}
			/>
			<FilterSearchSelect
				data={airlines}
				entityName='airline'
				value={currentAirline}
				onChange={setCurrentAirline}
			/>
		</div>
	);
};
