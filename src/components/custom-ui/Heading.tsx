import type { PropsWithChildren } from 'react';

export const Heading = ({ children }: PropsWithChildren) => {
	return (
		<h1 className='text-foreground mb-4 text-3xl font-bold'>{children}</h1>
	);
};
