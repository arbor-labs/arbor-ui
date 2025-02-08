import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import metamaskSDK from '@web3-onboard/metamask'
import { init } from '@web3-onboard/react'
import wagmi from '@web3-onboard/wagmi'
import walletConnectModule from '@web3-onboard/walletconnect'
import { base, mainnet } from 'viem/chains'

const DAPP_NAME = 'Arbor Audio'

/* Wallets */
const wallets = [
	// Browser wallet
	injectedModule(),
	// MetaMask
	metamaskSDK({
		options: {
			extensionOnly: false,
			dappMetadata: {
				name: DAPP_NAME,
			},
		},
	}),
	// Ledger
	ledgerModule({
		walletConnectVersion: 2,
		projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? '',
		requiredChains: [mainnet.id, base.id],
	}),
	// WallectConnect
	walletConnectModule({
		projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
		requiredChains: [mainnet.id],
		optionalChains: [base.id],
		dappUrl: 'https://arbor.audio',
	}),
]

/* Chains */
const chains = [
	{
		id: mainnet.id,
		token: 'ETH',
		label: 'Ethereum',
		rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
	},
	{
		id: base.id,
		token: 'ETH',
		label: 'Base',
		rpcUrl: `https://base-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
	},
]

/* Config */
export const onboardConfig = init({
	wagmi,
	wallets,
	chains,
	appMetadata: {
		name: 'Arbor Audio',
		icon: '/favicon.ico',
		logo: '/arbor_logo_text_wave_black.svg',
		description: 'A collaborative music-making platform',
		// gettingStartedGuide: '',
		// explore: '',
		recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io/download' }],
		// agreement: {
		// 	version: '1',
		// 	termsUrl: 'https://arbor.audio/terms',
		// 	privacyUrl: 'https://arbor.audio/privacy',
		// },
	},
})
