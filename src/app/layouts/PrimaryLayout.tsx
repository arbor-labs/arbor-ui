'use client'
import { Web3OnboardProvider } from '@web3-onboard/react'

import { onboard } from '$/lib/onboard'

import { AppFooter } from '../components/AppFooter'
import { AppHeader } from '../components/AppHeader'

type PropTypes = {
	children: React.ReactNode
}

export function PrimaryLayout({ children }: PropTypes) {
	return (
		<Web3OnboardProvider web3Onboard={onboard}>
			<AppHeader />
			{children}
			<AppFooter />
		</Web3OnboardProvider>
	)
}
