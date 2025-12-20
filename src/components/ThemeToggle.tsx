import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useTheme } from '@/providers/theme/useTheme';

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<>
			<Button
				onClick={() => {
					toggleTheme();
				}}
				variant='secondary'
				size='icon'
			>
				{theme === 'dark' ? <Moon size={23} /> : <Sun size={23} />}
			</Button>
		</>
	);
};
