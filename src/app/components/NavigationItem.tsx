import Link from 'next/link'

type Props = {
	href: string
	title: string
	isActive: boolean
	onClick: () => void
}

export function NavigationItemDesktop({ href, title, isActive, onClick }: Props) {
	const classNames =
		'rounded-md px-3 py-2 text-sm font-[400] uppercase text-[--arbor-white] hover:bg-[--arbor-pink] hover:text-[--arbor-white]'
	const selectedClassNames = 'rounded-md px-3 py-2 text-sm font-[600] uppercase bg-[--arbor-red] text-[--arbor-white]'

	return (
		<Link
			href={href}
			className={isActive ? selectedClassNames : classNames}
			role="menuitem"
			aria-current={isActive ? 'page' : undefined}
			onClick={onClick}
		>
			{title}
		</Link>
	)
}

export function NavigationItemMobile({ href, title, isActive, onClick }: Props) {
	const classNames =
		'block rounded-md px-3 py-2 text-base font-[400] uppercase text-[--arbor-white] hover:bg-[--arbor-pink] hover:text-[--arbor-white]'
	const selectedClassNames =
		'block rounded-md px-3 py-2 text-base font-[600] uppercase bg-[--arbor-red] text-[--arbor-white]'

	return (
		<Link
			href={href}
			className={isActive ? selectedClassNames : classNames}
			role="menuitem"
			aria-current={isActive ? 'page' : undefined}
			onClick={onClick}
		>
			{title}
		</Link>
	)
}
