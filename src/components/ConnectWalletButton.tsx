import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { HiOutlineChevronDown } from 'react-icons/hi'

import { useWeb3 } from '$/providers/Web3Provider'
import { formatAddress } from '$/utils/formatAddress'

export function ConnectWalletButton() {
	const { account, connecting, isConnected, handleConnectDisconnect } = useWeb3()

	return isConnected ? (
		<div className="flex items-center gap-x-2">
			<PopoverGroup>
				<Popover className="relative">
					<PopoverButton className="flex items-center gap-x-1 rounded-md border-2 border-[--arbor-purple] px-3 py-1 text-sm/6 font-semibold text-[--arbor-white]">
						{formatAddress(account?.address)}
						<HiOutlineChevronDown aria-hidden="true" className="size-4 text-[--arbor-white]" />
					</PopoverButton>
					<PopoverPanel
						transition
						className="data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in absolute -right-0 top-full z-10 mt-2 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 transition"
					>
						<div
							onClick={handleConnectDisconnect}
							className="block cursor-pointer rounded-md px-3 py-2 text-sm/6 font-semibold text-[--arbor-black] hover:bg-gray-100"
						>
							Disconnect
						</div>
					</PopoverPanel>
				</Popover>
			</PopoverGroup>
		</div>
	) : (
		<button
			type="button"
			className="block rounded-md bg-[--arbor-purple] px-3 py-2 text-sm font-[800] uppercase italic text-[--arbor-white] hover:bg-[--arbor-purple-hover]"
			onClick={handleConnectDisconnect}
			disabled={connecting}
		>
			{connecting ? 'Connecting...' : 'Connect Wallet'}
		</button>
	)
}
