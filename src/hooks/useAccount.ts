import { Context as Web3OnboardContext } from '@web3-onboard/react/dist/context'
import { getAccount } from '@web3-onboard/wagmi'
import { useContext } from 'react'

export const useAccount = () => {
	const context = useContext(Web3OnboardContext)
	if (context === undefined) throw new Error('"useAccount()" must be used within a Web3OnboardProvider component.')

	const [activeWallet] = context.state.get().wallets
	const wagmiConfig = context.state.get().wagmiConfig

	console.log({ activeWallet, wagmiConfig })

	if (!wagmiConfig) return undefined

	return getAccount(wagmiConfig)
}
