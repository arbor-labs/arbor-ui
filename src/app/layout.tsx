import './globals.css'

import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

import { AppFooter } from './components/AppFooter'
import { AppHeader } from './components/AppHeader'

const kanit = Kanit({
	variable: '--font-kanit',
	weight: ['300', '400', '600', '800'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Arbor',
	description:
		'The Arbor Protocol is a collaborative, music-making experience where artists can create music NFTs and benefit from split revenue and royalties via collectors.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${kanit.variable} antialiased`}>
				<AppHeader />
				{children}
				<AppFooter />
			</body>
		</html>
	)
}
