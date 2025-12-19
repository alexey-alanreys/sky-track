import type { IFlight } from '@/types/flight.types';

interface Props {
	flight: IFlight;
}

export const FlightImage = ({ flight }: Props) => {
	return (
		<div
			className='h-72 w-full pt-28'
			style={{
				background: `linear-gradient(to top, ${flight?.colorGradient[0]}, ${flight?.colorGradient[1]})`
			}}
		>
			<img
				src={flight?.airplane.image}
				alt={flight?.airplane.name}
				className='mx-auto h-auto max-w-[95%]'
			/>
		</div>
	);
};
