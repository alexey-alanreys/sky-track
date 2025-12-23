// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	optimizeDeps: {
		include: ['@trpc/client', '@trpc/react-query'], // вынести клиентские модули в pre-bundle
		exclude: [
			'@trpc/server',
			'@trpc/server/observable',
			'@trpc/server/unstable-core-do-not-import'
		]
	},
	ssr: {
		noExternal: ['@trpc/client', '@trpc/react-query'] // исключить серверные части
	}
});
