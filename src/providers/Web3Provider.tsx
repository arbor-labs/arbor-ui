import { useConnectWallet } from '@web3-onboard/react'
import { Context as Web3OnboardContext } from '@web3-onboard/react/dist/context'
import { type GetAccountReturnType } from '@web3-onboard/wagmi'
import { getAccount } from '@web3-onboard/wagmi'
import _omit from 'lodash/omit'
import { createContext, useContext, useEffect, useState } from 'react'

type Web3ContextValues = {
	account?: GetAccountReturnType
	connecting: boolean
	isConnected: boolean
	handleConnectDisconnect: () => void
}

type Props = {
	children: React.ReactNode
}

const defaultContextValues: Web3ContextValues = {
	account: {
		address: undefined,
		addresses: undefined,
		chain: undefined,
		chainId: undefined,
		connector: undefined,
		isConnected: false,
		isReconnecting: false,
		isConnecting: false,
		isDisconnected: true,
		status: 'disconnected',
	},
	connecting: false,
	isConnected: false,
	handleConnectDisconnect: () => {},
}

const Web3Context = createContext<Web3ContextValues>(defaultContextValues)

export function Web3Provider({ children }: Props) {
	const context = useContext(Web3OnboardContext)

	// Local state for context values
	const [account, setAccount] = useState(defaultContextValues.account)

	// Hooks from web3-onboard
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

	const handleConnectWallet = () => {
		if (wallet) disconnect(wallet)
		else connect()
	}

	const setConnectedAccount = () => {
		const wagmiConfig = context?.state.get().wagmiConfig
		if (!wagmiConfig) return
		const acct = getAccount(wagmiConfig)
		setAccount(acct)
		// localStorage.setItem('connectedAccount', stringify(acct))
	}

	// useEffect(() => {
	// 	// Check local storage for a previous connected account to persist through refreshes
	// 	const storedAccount = localStorage.getItem('connectedAccount')
	// 	if (storedAccount) setAccount(JSON.parse(storedAccount))
	// }, [])

	useEffect(() => {
		const storedAccount = localStorage.getItem('connectedAccount')
		if (context && wallet) {
			// Connected, set local state and storage
			console.log('connected', { context, wallet })
			setConnectedAccount()
		} else if (storedAccount) {
			setAccount(JSON.parse(storedAccount))
		} else {
			// Disconnected, reset local state and storage
			console.log('disconnected')
			setAccount(undefined)
			// localStorage.removeItem('connectedAccount')
		}
	}, [wallet, context])

	return (
		<Web3Context.Provider
			value={{
				account,
				connecting, //: !!account?.isConnecting,
				isConnected: !!wallet, //: !!account?.isConnected,
				handleConnectDisconnect: handleConnectWallet,
			}}
		>
			{children}
		</Web3Context.Provider>
	)
}

// Hook
export const useWeb3 = () => {
	const context: Web3ContextValues = useContext(Web3Context)
	if (context === undefined) {
		throw new Error('The "useWeb3()" hook must be used within a <Web3Provider /> component.')
	}
	return context
}
