'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3OnboardProvider } from '@web3-onboard/react'

import { onboardConfig } from '$/lib/onboard.config'
import { Web3Provider } from '$/providers/Web3Provider'

import { AppFooter } from '../../components/AppFooter'
import { AppHeader } from '../../components/AppHeader'

type PropTypes = {
	children: React.ReactNode
}

const queryClient = new QueryClient()
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function PrimaryLayout({ children }: PropTypes) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Web3OnboardProvider web3Onboard={onboardConfig}>
				<Web3Provider>
					<AppHeader />
					{children}
					<AppFooter />
				</Web3Provider>
			</Web3OnboardProvider>
		</QueryClientProvider>
	)
}
