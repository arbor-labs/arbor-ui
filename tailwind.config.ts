import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'arbor-black': 'var(--arbor-black)',
				'arbor-white': 'var(--arbor-white)',
				'arbor-gray': 'var(--arbor-gray)',
				'arbor-gray-light': 'var(--arbor-gray-light)',
				'arbor-red': 'var(--arbor-red)',
				'arbor-red-hover': 'var(--arbor-red-hover)',
				'arbor-pink': 'var(--arbor-pink)',
				'arbor-pink-hover': 'var(--arbor-pink-hover)',
				'arbor-purple': 'var(--arbor-purple)',
				'arbor-purple-hover': 'var(--arbor-purple-hover)',
			},
		},
	},
	plugins: [],
} satisfies Config
