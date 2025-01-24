export function ConnectWalletButton() {
	const handleConnectWallet = () => {
		console.log('todo: implement')
	}

	return (
		<button
			type="button"
			className=" block rounded-md bg-[--arbor-purple] px-3 py-2 text-sm font-[800] uppercase italic text-[--arbor-white] hover:bg-[--arbor-purple-hover]"
			onClick={handleConnectWallet}
		>
			Connect Wallet
		</button>
	)
}
