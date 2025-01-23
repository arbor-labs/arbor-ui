'use client'
import { usePathname } from 'next/navigation'
import { RiMenu5Fill } from 'react-icons/ri'

import { NavigationItemDesktop, NavigationItemMobile } from './NavigationItem'

export function AppHeader() {
	const pathname = usePathname()

	const navigationItems = [
		{ title: 'Create', path: '/projects/create' },
		{ title: 'Projects', path: '/projects' },
		{ title: 'Stems', path: '/stems' },
		{ title: 'Marketplace', path: '/marketplace' },
	]

	return (
		<header>
			<nav className="bg-gray-800">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* Mobile menu button */}
							<button
								type="button"
								className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<RiMenu5Fill />
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex shrink-0 items-center">
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
									alt="Your Company"
								/>
							</div>
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									{navigationItems.map(item => (
										<NavigationItemDesktop
											key={item.title}
											href={item.path}
											title={item.title}
											isActive={pathname === item.path}
										/>
									))}
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<button
								type="button"
								className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
							>
								<span className="absolute -inset-1.5"></span>
								<span className="sr-only">View notifications</span>
								<svg
									className="size-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
									/>
								</svg>
							</button>

							{/* Profile dropdown */}
							<div className="relative ml-3">
								<div>
									<button
										type="button"
										className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
									>
										<span className="absolute -inset-1.5"></span>
										<span className="sr-only">Open user menu</span>
										<img
											className="size-8 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
									</button>
								</div>

								{/*
									Dropdown menu, show/hide based on menu state.

									Entering: "transition ease-out duration-100"
										From: "transform opacity-0 scale-95"
										To: "transform opacity-100 scale-100"
									Leaving: "transition ease-in duration-75"
										From: "transform opacity-100 scale-100"
										To: "transform opacity-0 scale-95"
								*/}
								<div
									className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button"
									tabindex="-1"
								>
									{/* Active: "bg-gray-100 outline-hidden", Not Active: "" */}
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-0"
									>
										Your Profile
									</a>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-1"
									>
										Settings
									</a>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-2"
									>
										Sign out
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile menu, show/hide based on menu state. */}
				<div className="sm:hidden" id="mobile-menu">
					<div className="space-y-1 px-2 pt-2 pb-3">
						{navigationItems.map(item => (
							<NavigationItemMobile
								key={item.title}
								href={item.path}
								title={item.title}
								isActive={pathname === item.path}
							/>
						))}
					</div>
				</div>
			</nav>
		</header>
	)
}
