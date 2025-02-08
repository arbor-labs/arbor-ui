import { useConnectWallet } from '@web3-onboard/react'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { Address, Hex, zeroAddress } from 'viem'

import { Notification } from '$/components/Notification'
import { AccountData } from '$/graphql/hooks/useAccount'
import { useFindOrCreateAccount } from '$/graphql/hooks/useFindOrCreateAccount'
import { disconnectWallet, signMessage } from '$/lib/walletActions'
import { getErrorMessage } from '$/utils/getErrorMessage'

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
	accountConnectionSuccess: boolean
	isSigningError: boolean
	isAccountError: boolean
	errorMessage: string
}

type Action =
	| { type: 'SET_CONNECTING'; connecting: boolean }
	| { type: 'CONNECT_SUCCESS'; address: Address }
	| { type: 'DISCONNECT_SUCCESS' }
	| { type: 'SET_ACCOUNT'; account: AccountData }
	| { type: 'SET_FETCHING_ACCOUNT'; isFetching: boolean }
	| { type: 'SET_CREATING_ACCOUNT'; isCreating: boolean }
	| { type: 'SET_SIGNING_ERROR'; isError: boolean }
	| { type: 'SET_ACCOUNT_CONNECTION_SUCCESS'; isSuccess: boolean }
	| { type: 'SET_ACCOUNT_ERROR'; isError: boolean; errorMessage: string }

const initialState: State = {
	connecting: false,
	isConnected: false,
	connectedAddress: zeroAddress,
	connectedAccount: undefined,
	accountConnectionSuccess: false,
	isSigningError: false,
	isAccountError: false,
	errorMessage: '',
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_CONNECTING':
			return { ...state, connecting: action.connecting }
		case 'CONNECT_SUCCESS':
			return { ...state, connecting: false, isConnected: true, connectedAddress: action.address }
		case 'DISCONNECT_SUCCESS':
			return { ...state, isConnected: false, connectedAddress: zeroAddress, connectedAccount: undefined }
		case 'SET_ACCOUNT':
			return { ...state, connectedAccount: action.account }
		case 'SET_ACCOUNT_CONNECTION_SUCCESS':
			return { ...state, accountConnectionSuccess: action.isSuccess }
		case 'SET_SIGNING_ERROR':
			return { ...state, isSigningError: action.isError }
		case 'SET_ACCOUNT_ERROR':
			return { ...state, isAccountError: action.isError, errorMessage: action.errorMessage }
		default:
			return state
	}
}

const Web3Context = createContext<Web3ContextValues | undefined>(undefined)

export function Web3Provider({ children }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const [{ wallet, connecting }, connect] = useConnectWallet()
	const { mutateAsync: findOrCreateAccount } = useFindOrCreateAccount()

	const handleConnectWallet = useCallback(async () => {
		if (wallet) {
			await disconnectWallet()
			dispatch({ type: 'DISCONNECT_SUCCESS' })
		} else {
			const walletState = await connect()
			if (walletState[0]?.accounts[0]) {
				const { address } = walletState[0].accounts[0]
				dispatch({ type: 'CONNECT_SUCCESS', address })
			}
		}
	}, [wallet, connect])

	useEffect(() => {
		dispatch({ type: 'SET_CONNECTING', connecting })
	}, [connecting])

	useEffect(() => {
		const getOrCreateAccount = async (signature: Hex) => {
			dispatch({ type: 'SET_ACCOUNT_ERROR', isError: false, errorMessage: '' })
			dispatch({ type: 'SET_ACCOUNT_CONNECTION_SUCCESS', isSuccess: false })
			const createAccountInput = { address: state.connectedAddress, signature }
			try {
				const { findOrCreateAccount: account } = await findOrCreateAccount(createAccountInput)
				dispatch({ type: 'SET_ACCOUNT', account })
				dispatch({ type: 'SET_ACCOUNT_CONNECTION_SUCCESS', isSuccess: true })
			} catch (error) {
				dispatch({ type: 'SET_ACCOUNT_ERROR', isError: true, errorMessage: getErrorMessage(error) })
			}
		}

		const signOnboardingMessage = async () => {
			dispatch({ type: 'SET_SIGNING_ERROR', isError: false })
			dispatch({ type: 'SET_CONNECTING', connecting: true })
			try {
				// Capture an onboarding signature
				const message = `Welcome to Arbor Audio! This is a place where you can collaborate with others on your music and earn royalties in the form of crypto. Please accept this message to create your account with Arbor.`
				const signature = await signMessage(message)
				if (signature) {
					// Find or create the account record in backend
					await getOrCreateAccount(signature)
				}
			} catch {
				dispatch({ type: 'SET_SIGNING_ERROR', isError: true })
			} finally {
				dispatch({ type: 'SET_CONNECTING', connecting: false })
			}
		}

		if (state.connectedAddress !== zeroAddress) {
			// TODO: Check if user has already onboarded by checking if they have an account
			signOnboardingMessage()
		}
	}, [state.connectedAddress, findOrCreateAccount])

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
			{state.isSigningError && (
				<Notification
					isOpen
					variant="error"
					title="An error occurred while connecting your wallet"
					text="Please sign the message before connecting to Arbor and try again."
				/>
			)}
			{state.isAccountError && (
				<Notification
					isOpen
					variant="error"
					title="An error occurred while getting or creating your account"
					text={state.errorMessage}
				/>
			)}
			{state.accountConnectionSuccess && (
				<Notification
					isOpen
					variant="success"
					title="You've successfully connected your account to Arbor!"
					text="You can now create projects and collaborate with others."
				/>
			)}
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
