import { MoreHorizontal, Route } from 'lucide-react';
import { toast } from 'sonner';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { cn } from '@/utils/cn';

import type { TFlight } from '@/lib/trpc';

import { toggleFlightRoute } from '@/store/flight-actions/flight-action.slice';

import { MapPin } from '../animate-ui/icons/map-pin';
import { SquareArrowOutUpRight } from '../animate-ui/icons/square-arrow-out-up-right';
import { QUERY_PARAM_FLIGHT } from '../flight-list/flights.constants';

interface Props {
	flight: NonNullable<TFlight>;

	onFollow: () => void;
	onMore: () => void;
}

export const FlightActions = ({ onFollow, onMore, flight }: Props) => {
	const dispatch = useAppDispatch();
	const isShowRoute = useAppSelector(
		(state) => state.flightActions.isShowRoute
	);

	const handleShare = async () => {
		try {
			const url = `${window.location.origin}${window.location.pathname}?${QUERY_PARAM_FLIGHT}=${flight.id}`;
			await navigator.clipboard.writeText(url);

			toast.success('Flight link copied to clipboard', {
				description: 'Share it with your friends! ✈️'
			});
		} catch {
			toast.error('Failed to copy flight link.', {
				description: 'Please try again.'
			});
		}
	};

	return (
		<div className='xs:text-sm'>
			<div className='grid grid-cols-4 gap-1'>
				<button
					onClick={() => dispatch(toggleFlightRoute())}
					className={cn(
						'bg-card px-mini-element py-mini-element xs:rounded-tl-xl xs:rounded-bl-xl hover:bg-card/60 flex flex-col items-center gap-2 rounded-tl-2xl rounded-bl-2xl transition-colors',
						{
							'bg-[#ddd] hover:bg-[#ddd]/70 dark:bg-[#282828] dark:hover:bg-[#282828]/70':
								isShowRoute
						}
					)}
				>
					<Route size={22} className='xs:size-5' />
					<span>Route</span>
				</button>
				<button
					onClick={onFollow}
					className='bg-card px-mini-element py-mini-element hover:bg-card/60 flex flex-col items-center gap-2 transition-colors'
				>
					<MapPin animateOnHover animateOnTap size={22} className='xs:size-5' />
					<span>Follow</span>
				</button>
				<button
					onClick={handleShare}
					className='bg-card px-mini-element py-mini-element hover:bg-card/60 flex flex-col items-center gap-2 transition-colors'
				>
					<SquareArrowOutUpRight
						animateOnHover
						animateOnTap
						size={22}
						className='xs:size-5'
					/>
					<span>Share</span>
				</button>
				<button
					onClick={onMore}
					className='bg-card px-mini-element py-mini-element hover:bg-card/60 flex flex-col items-center gap-2 rounded-tr-2xl rounded-br-2xl transition-colors'
				>
					<MoreHorizontal size={22} className='xs:size-5' />
					<span>More</span>
				</button>
			</div>
		</div>
	);
};
