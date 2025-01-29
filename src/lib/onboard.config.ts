import injectedModule from '@web3-onboard/injected-wallets'
import ledgerModule from '@web3-onboard/ledger'
import metamaskSDK from '@web3-onboard/metamask'
import { init } from '@web3-onboard/react'
import wagmi from '@web3-onboard/wagmi'
import walletConnectModule from '@web3-onboard/walletconnect'

const DAPP_NAME = 'Arbor Audio'

/* Wallets */
const injected = injectedModule()
const metamask = metamaskSDK({
	options: {
		extensionOnly: false,
		dappMetadata: {
			name: DAPP_NAME,
		},
	},
})
const ledger = ledgerModule({
	walletConnectVersion: 2,
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? '',
	requiredChains: ['0x1', '0x2105'],
})
const wallectConnect = walletConnectModule({
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? '',
	requiredChains: [1],
	optionalChains: [137],
	dappUrl: 'https://arbor.audio',
})

/* Config */
export const onboardConfig = init({
	wagmi,
	wallets: [injected, metamask, ledger, wallectConnect],
	chains: [
		{
			id: '0x1',
			token: 'ETH',
			label: 'Ethereum',
			rpcUrl: 'https://mainnet.infura.io/v3/17c1e1500e384acfb6a72c5d2e67742e',
		},
		{
			id: '0x2105',
			token: 'ETH',
			label: 'Base',
			rpcUrl: 'https://mainnet.base.org',
		},
	],
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
