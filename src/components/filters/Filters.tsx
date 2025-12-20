import { FLIGHTS } from '@/components/flight-list/flights.data';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

const fromCountries = [...new Set(FLIGHTS.map(flight => flight.from.country))];

interface Props {
	fromCountry: string | undefined;
	setFromCountry: (country: string | undefined) => void;
}

export const Filters = ({ fromCountry, setFromCountry }: Props) => {
	return (
		<div className='mb-4 ml-1'>
			<Select
				onValueChange={value => {
					return setFromCountry(value === 'all' ? undefined : value);
				}}
				defaultValue={fromCountry}
			>
				<SelectTrigger className='w-45'>
					<SelectValue placeholder='Choose from' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>All</SelectItem>
					{fromCountries.map(country => (
						<SelectItem key={country} value={country}>
							{country}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
