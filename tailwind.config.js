/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				'pop-in': {
					'0%': { scale: '90%', opacity: '0%' },
					'100%': { scale: '100%', opacity: '100%' }
				}
			},
			animation: {
				'pop-in': 'pop-in 0.1s ease-out'
			}
		}
	},
	plugins: []
};
