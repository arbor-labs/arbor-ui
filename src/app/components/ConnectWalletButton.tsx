import { useConnectWallet } from '@web3-onboard/react'

export function ConnectWalletButton() {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

	const handleConnectWallet = () => {
		if (wallet) disconnect(wallet)
		else connect()
	}

	// TODO: create an ethers provider
	// let ethersProvider

	// if (wallet) {
	// 	// if using ethers v6 this is:
	// 	// ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
	// 	ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
	// }

	return (
		<button
			type="button"
			className=" block rounded-md bg-[--arbor-purple] px-3 py-2 text-sm font-[800] uppercase italic text-[--arbor-white] hover:bg-[--arbor-purple-hover]"
			onClick={handleConnectWallet}
			disabled={connecting}
		>
			{connecting ? 'Connecting...' : wallet ? 'Disconnect' : 'Connect Wallet'}
		</button>
	)
}
