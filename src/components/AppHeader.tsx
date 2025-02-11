'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { RiMenu5Fill } from 'react-icons/ri'

import { ConnectWalletButton } from './ConnectWalletButton'
import { NavigationItemDesktop, NavigationItemMobile } from './NavigationItem'

export function AppHeader() {
	const pathname = usePathname()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const navigationItems = [
		{ title: 'Create', path: '/projects/create' },
		{ title: 'Projects', path: '/projects' },
		{ title: 'Stems', path: '/stems' },
		{ title: 'Marketplace', path: '/marketplace' },
	]

	return (
		<header>
			<nav className="bg-black">
				<div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
							{/* Mobile menu button */}
							<button
								type="button"
								className="focus:outline-hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded={isMobileMenuOpen}
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								<RiMenu5Fill />
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
							<div className="flex shrink-0 items-center">
								{/* Logo */}
								<Link href="/" className="block" role="link">
									<Image
										className="h-8 w-auto"
										src="/arbor_logo_text_wave_white.svg"
										alt="Arbor"
										width="112"
										height="32"
									/>
								</Link>
							</div>
							<div className="hidden md:ml-6 md:block">
								{/* Desktop navigation */}
								<div className="flex space-x-4">
									{navigationItems.map(item => (
										<NavigationItemDesktop
											key={item.title}
											href={item.path}
											title={item.title}
											isActive={pathname === item.path}
											onClick={() => (isMobileMenuOpen ? setIsMobileMenuOpen(false) : undefined)}
										/>
									))}
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
							{/* Connect wallet button */}
							<div className="relative ml-3">
								<ConnectWalletButton />
							</div>
						</div>
					</div>
				</div>
				{/* Mobile navigation, show/hide based on menu state. */}
				<div className={isMobileMenuOpen ? 'md:hidden' : 'hidden md:hidden'} id="mobile-menu">
					<div className="space-y-1 px-2 pb-3 pt-2">
						{navigationItems.map(item => (
							<NavigationItemMobile
								key={item.title}
								href={item.path}
								title={item.title}
								isActive={pathname === item.path}
								onClick={() => (isMobileMenuOpen ? setIsMobileMenuOpen(false) : undefined)}
							/>
						))}
					</div>
				</div>
			</nav>
		</header>
	)
}
