import Link from 'next/link'

type PropTypes = {
	href: string
	title: string
	isActive: boolean
}

export function NavigationItemDesktop({ href, title, isActive }: PropTypes) {
	const classNames = 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
	const selectedClassNames = 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'

	return (
		<Link
			href={href}
			className={isActive ? selectedClassNames : classNames}
			role="menuitem"
			aria-current={isActive ? 'page' : undefined}
		>
			{title}
		</Link>
	)
}

export function NavigationItemMobile({ href, title, isActive }: PropTypes) {
	const classNames = 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
	const selectedClassNames = 'block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'

	return (
		<Link
			href={href}
			className={isActive ? selectedClassNames : classNames}
			role="menuitem"
			aria-current={isActive ? 'page' : undefined}
		>
			{title}
		</Link>
	)
}
