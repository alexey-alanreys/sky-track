import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { CenterLayout } from '@/components/CenterLayout';
import { Layout } from '@/components/Layout';

import { Favorites } from '@/screens/favorites/Favorites';
import { Home } from '@/screens/home/Home';

import { MotionProvider } from '@/providers/motion/motionProvider';
import { QueryProvider } from '@/providers/query/queryProvider';
import { ReduxProvider } from '@/providers/redux/reduxProvider';
import { ThemeProvider } from '@/providers/theme/themeProvider';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReduxProvider>
			<QueryProvider>
				<ThemeProvider>
					<MotionProvider>
						<BrowserRouter>
							<Routes>
								<Route element={<Layout />}>
									<Route path='/' element={<Home />} />
									<Route element={<CenterLayout />}>
										<Route path='/favorites' element={<Favorites />} />
									</Route>
								</Route>
							</Routes>
						</BrowserRouter>
					</MotionProvider>
				</ThemeProvider>
			</QueryProvider>
		</ReduxProvider>
	</StrictMode>
);
