import type { CSSProperties } from 'react';

import { cn } from '@/utils/cn';

interface Props {
	count?: number;
	style?: CSSProperties;
	className?: string;
}

export const SkeletonLoader = ({ count = 1, style, className }: Props) => {
	return (
		<>
			{Array.from({ length: count }, (_, index) => {
				return (
					<div
						key={index}
						className={cn(
							'mb-[0.65rem] h-10 animate-pulse rounded-lg bg-neutral-900 last:mb-0',
							className
						)}
						style={style}
					/>
				);
			})}
		</>
	);
};
