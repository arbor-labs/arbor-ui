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
		'inline-block rounded-md px-3 py-2 text-sm text-[--arbor-white] font-[800] uppercase italic border-2 border-[--arbor-black] '
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
