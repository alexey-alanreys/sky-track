import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/providers/theme/useTheme';

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<>
			<button
				onClick={toggleTheme}
				className='bg-card flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-700 sm:p-1'
			>
				{theme === 'dark' ? <Moon size={23} /> : <Sun size={23} />}
			</button>
		</>
	);
};
