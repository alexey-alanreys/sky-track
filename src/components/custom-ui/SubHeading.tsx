import type { PropsWithChildren } from 'react';

export const SubHeading = ({ children }: PropsWithChildren) => {
	return <div className='text-foreground mb-6 opacity-70'>{children}</div>;
};
