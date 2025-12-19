import { Outlet } from 'react-router';

export const Layout = () => {
	return (
		<div className='relative p-7 sm:p-2.5'>
			<Outlet />
		</div>
	);
};
