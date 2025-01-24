import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:tailwindcss/recommended'],
		plugins: ['simple-import-sort', 'prettier'],
		rules: {
			'prettier/prettier': 'warn',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'warn',
		},
	}),
]

export default eslintConfig
