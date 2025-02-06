import { useConnectWallet } from '@web3-onboard/react'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { Address, zeroAddress } from 'viem'

import { AccountData, useAccount } from '$/graphql/hooks/useAccount'
import { useCreateAccount } from '$/graphql/hooks/useCreateAccount'

type Web3ContextValues = {
	connecting: boolean
	isConnected: boolean
	handleConnectDisconnect: () => void
	connectedAccount?: AccountData | undefined
}

type Props = {
	children: React.ReactNode
}

type State = {
	connecting: boolean
	isConnected: boolean
	connectedAddress: Address
	connectedAccount: AccountData | undefined
}

type Action =
	| { type: 'SET_CONNECTING'; connecting: boolean }
	| { type: 'CONNECT_SUCCESS'; address: Address }
	| { type: 'DISCONNECT_SUCCESS' }
	| { type: 'SET_ACCOUNT'; account: AccountData }

const initialState: State = {
	connecting: false,
	isConnected: false,
	connectedAddress: zeroAddress,
	connectedAccount: undefined,
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_CONNECTING':
			console.log('updating connecting...')
			return { ...state, connecting: action.connecting }
		case 'CONNECT_SUCCESS':
			return { ...state, connecting: false, isConnected: true, connectedAddress: action.address }
		case 'DISCONNECT_SUCCESS':
			return { ...state, isConnected: false, connectedAddress: zeroAddress, connectedAccount: undefined }
		case 'SET_ACCOUNT':
			return { ...state, connectedAccount: action.account }
		default:
			return state
	}
}

const Web3Context = createContext<Web3ContextValues | undefined>(undefined)

export function Web3Provider({ children }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
	const { refetch: fetchAccount } = useAccount(state.connectedAddress)
	const { mutateAsync: createAccount } = useCreateAccount()

	useEffect(() => {
		dispatch({ type: 'SET_CONNECTING', connecting })
	}, [connecting])

	const handleConnectWallet = useCallback(async () => {
		if (wallet) {
			console.log('has wallet, disconnecting...')
			await disconnect(wallet)
			dispatch({ type: 'DISCONNECT_SUCCESS' })
		} else {
			console.log('no wallet, connecting...')
			const walletState = await connect()
			if (walletState[0]?.accounts[0]) {
				const { address } = walletState[0].accounts[0]
				dispatch({ type: 'CONNECT_SUCCESS', address })
			}
		}
	}, [wallet, connect, disconnect])

	useEffect(() => {
		const fetchConnectedAccount = async () => {
			const { data } = await fetchAccount()
			if (!data) {
				const result = await createAccount({ address: state.connectedAddress })
				dispatch({ type: 'SET_ACCOUNT', account: result.createAccount })
			} else {
				dispatch({ type: 'SET_ACCOUNT', account: data.account })
			}
		}
		if (state.connectedAddress !== zeroAddress) {
			fetchConnectedAccount()
		}
	}, [state.connectedAddress, fetchAccount, createAccount])

	return (
		<Web3Context.Provider
			value={{
				connecting: state.connecting,
				isConnected: state.isConnected,
				handleConnectDisconnect: handleConnectWallet,
				connectedAccount: state.connectedAccount,
			}}
		>
			{children}
		</Web3Context.Provider>
	)
}

export const useWeb3 = () => {
	const context = useContext(Web3Context)
	if (context === undefined) {
		throw new Error('The "useWeb3()" hook must be used within a <Web3Provider /> component.')
	}
	return context
}
