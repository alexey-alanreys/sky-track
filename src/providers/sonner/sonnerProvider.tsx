import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export const SonnerProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Toaster position='top-right' />
			{children}
		</>
	);
};
