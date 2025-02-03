import {
	disconnect,
	sendTransaction as wagmiSendTransaction,
	signMessage as wagmiSignMessage,
	switchChain,
} from '@web3-onboard/wagmi'
import { Address, fromHex, Hex, isHex, parseEther } from 'viem'

import { onboardConfig } from './onboard.config'

export const sendTransaction = async (to: Address, value?: string, data?: Hex) => {
	const [activeWallet] = onboardConfig.state.get().wallets
	const { wagmiConnector } = activeWallet
	const wagmiConfig = onboardConfig.state.get().wagmiConfig

	if (!wagmiConfig) {
		console.warn('[sendTransaction]: Wagmi config is not loaded')
		return
	}

	const result = await wagmiSendTransaction(wagmiConfig, {
		to,
		connector: wagmiConnector,
		value: value ? parseEther(value) : undefined,
		data,
	})
	console.log(result)
}

export async function signMessage(chainId: string, message: string) {
	const [activeWallet] = onboardConfig.state.get().wallets
	const wagmiConfig = onboardConfig.state.get().wagmiConfig

	if (!wagmiConfig) {
		console.warn('[sendTransaction]: Wagmi config is not loaded')
		return
	}

	await wagmiSignMessage(wagmiConfig, {
		message,
		connector: activeWallet.wagmiConnector,
	})
}

export async function switchWagmiChain(chainId: string) {
	const [activeWallet] = onboardConfig.state.get().wallets
	const { wagmiConnector } = activeWallet
	const wagmiConfig = onboardConfig.state.get().wagmiConfig

	if (!wagmiConfig) {
		console.warn('[sendTransaction]: Wagmi config is not loaded')
		return
	}

	let chainAsNumber
	if (isHex(chainId)) {
		chainAsNumber = fromHex(chainId, 'number')
	} else if (!isHex(chainId) && typeof chainId === 'number') {
		chainAsNumber = chainId
	} else {
		throw new Error('Invalid chainId')
	}

	await switchChain(wagmiConfig, {
		chainId: chainAsNumber,
		connector: wagmiConnector,
	})
}

export async function disconnectWallet() {
	const [activeWallet] = onboardConfig.state.get().wallets
	console.log(onboardConfig.state.get().wallets)
	const { wagmiConnector } = activeWallet
	const wagmiConfig = onboardConfig.state.get().wagmiConfig

	if (!wagmiConfig) {
		console.warn('[disconnectWallet]: Wagmi config is not loaded')
		return
	}

	disconnect(wagmiConfig, { connector: wagmiConnector })
}
