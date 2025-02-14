import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type Props = {
	children: React.ReactNode
	className?: string
	color?: 'red' | 'pink' | 'purple' | 'peach'
	disabled?: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonPrimary({ children, className, color, onClick, disabled, ...props }: Props) {
	let classes =
		'inline-block rounded-md px-3 py-2 text-sm text-[--arbor-white] font-[800] uppercase italic border-2 border-[--arbor-black] disabled:bg-gray-400 disabled:border-gray-500 disabled:text-gray-300 '
	switch (color) {
		case 'red':
			classes += 'bg-[--arbor-red] hover:bg-[--arbor-red-hover]'
			break
		case 'pink':
			classes += 'bg-[--arbor-pink] hover:bg-[--arbor-pink-hover]'
			break
		case 'peach':
			classes += 'bg-[--arbor-peach] hover:bg-[--arbor-peach-hover]'
			break
		case 'purple':
			classes += 'bg-[--arbor-purple] hover:bg-[--arbor-purple-hover]'
			break
		default:
			classes += 'bg-[--arbor-black] hover:bg-[--arbor-gray]'
			break
	}

	classes += ` ${className}`

	return (
		<button type="button" className={classes} onClick={onClick} disabled={disabled} {...props}>
			{children}
		</button>
	)
}

export function ButtonSecondary({ children, className, color, onClick, disabled, ...props }: Props) {
	let classes =
		'inline-block rounded-md px-3 py-2 text-sm font-[800] uppercase italic border-2 bg-none disabled:bg-gray-400 disabled:border-gray-500 disabled:text-gray-300 '
	switch (color) {
		case 'red':
			classes +=
				'border-[--arbor-red] text-[--arbor-red] hover:text-[--arbor-red-hover] hover:border-[--arbor-red-hover]'
			break
		case 'pink':
			classes +=
				'border-[--arbor-pink] text-[--arbor-pink] hover:text-[--arbor-pink-hover] hover:border-[--arbor-pink-hover]'
			break
		case 'peach':
			classes +=
				'border-[--arbor-peach] text-[--arbor-peach] hover:text-[--arbor-peach-hover] hover:border-[--arbor-peach-hover]'
			break
		case 'purple':
			classes +=
				'border-[--arbor-purple] text-[--arbor-purple] hover:text-[--arbor-purple-hover] hover:border-[--arbor-purple-hover]'
			break
		default:
			classes +=
				'border-[--arbor-black] text-[--arbor-black] hover:text-[--arbor-gray-light] hover:border-[--arbor-gray-light]'
			break
	}

	classes += ` ${className}`

	return (
		<button type="button" className={classes} onClick={onClick} disabled={disabled} {...props}>
			{children}
		</button>
	)
}
