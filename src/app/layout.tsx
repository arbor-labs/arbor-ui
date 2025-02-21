import './globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

import { PrimaryLayout } from './layouts/PrimaryLayout'

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
		<html lang="en-US">
			<body className={`${kanit.variable} antialiased`}>
				<PrimaryLayout>{children}</PrimaryLayout>
			</body>
			{process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
			)}
		</html>
	)
}
