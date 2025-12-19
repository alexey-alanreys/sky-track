import { useSearchParams } from 'react-router';

import type { IFlight } from '@/types/flight.types';

import { cn } from '@/lib/utils';

import { QUERY_PARAM_FLIGHT } from './flights.constants';

interface Props {
	flight: IFlight;
}

export const FlightCard = ({ flight }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);

	const isActive = selectedFlight === flight.id;

	return (
		<div
			className={cn(
				'relative w-full rounded-lg p-0.5 transition-colors ease-in',
				isActive
					? 'bg-linear-to-r from-rose-500 to-orange-400'
					: 'bg-transparent'
			)}
		>
			<button
				className='block h-full w-full rounded-lg bg-neutral-900 p-5'
				onClick={() =>
					setSearchParams({
						[QUERY_PARAM_FLIGHT]: flight.id
					})
				}
			>
				<div className='mb-7 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<img
							src={flight.logo}
							alt={flight.airline.name}
							width={40}
							height={40}
							className='rounded-full bg-white p-0.5'
						/>
						<span>{flight.id}</span>
					</div>
					<div>
						<span className='rounded-xl bg-neutral-800 px-1.5 py-0.5'>
							{flight.aircraftReg}
						</span>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='space-y-0.5'>
						<div>{flight.from.city}</div>
						<div className='text-3xl font-semibold'>{flight.from.code}</div>
					</div>

					<div>{/* PROGRESS BAR */}</div>

					<div>
						<div>{flight.to.city}</div>
						<div className='text-3xl font-semibold'>{flight.to.code}</div>
					</div>
				</div>
			</button>
		</div>
	);
};
