import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

import { useTheme } from '@/providers/theme/useTheme';

import { Header } from './header/Header';

export const Layout = () => {
	const theme = useTheme();

	return (
		<>
			<div className='relative p-7 sm:p-3'>
				<Header />
				<Outlet />
			</div>

			<Toaster position='top-right' theme={theme.theme} />
		</>
	);
};
