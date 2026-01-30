import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: [
			'.ngrok-free.app',
			'.ngrok.io',
			'.ngrok.app',
			'.trycloudflare.com'
		]
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'tools/**/*.{test,spec}.{js,ts}'],
		environment: 'node'
	}
});
