import { Outlet } from 'react-router';

import { ThemeToggle } from './ThemeToggle';

export const Layout = () => {
	return (
		<div className='relative p-7 sm:p-2.5'>
			<ThemeToggle />
			<Outlet />
		</div>
	);
};
