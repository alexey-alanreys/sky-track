import { useMemo } from 'react';

import { FLIGHTS } from '@/components/flight-list/flights.data';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface Props {
	fromCountry: string | undefined;
	setFromCountry: (country: string | undefined) => void;
}

export const Filters = ({ fromCountry, setFromCountry }: Props) => {
	const fromCountries = useMemo(
		() => [...new Set(FLIGHTS.map((flight) => flight.from.country))],
		[]
	);

	return (
		<div className='mb-4 ml-1'>
			<Select
				value={fromCountry ?? 'all'}
				onValueChange={(value) => {
					setFromCountry(value === 'all' ? undefined : value);
				}}
			>
				<SelectTrigger className='w-45'>
					<SelectValue placeholder='Choose from' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>All</SelectItem>
					{fromCountries.map((country) => (
						<SelectItem key={country} value={country}>
							{country}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
