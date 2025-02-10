import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type Props = {
	color?: 'red' | 'pink' | 'purple' | 'peach'
	children: React.ReactNode
	disabled?: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonPrimary({ children, color, onClick, disabled, ...props }: Props) {
	let className =
		'inline-block rounded-md px-3 py-2 text-sm text-[--arbor-white] font-[800] uppercase italic border-2 border-[--arbor-black] '
	switch (color) {
		case 'red':
			className += 'bg-[--arbor-red] hover:bg-[--arbor-red-hover]'
			break
		case 'pink':
			className += 'bg-[--arbor-pink] hover:bg-[--arbor-pink-hover]'
			break
		case 'peach':
			className += 'bg-[--arbor-peach] hover:bg-[--arbor-peach-hover]'
			break
		case 'purple':
			className += 'bg-[--arbor-purple] hover:bg-[--arbor-purple-hover]'
			break
		default:
			className += 'bg-[--arbor-black] hover:bg-[--arbor-gray]'
			break
	}
	return (
		<button type="button" className={className} onClick={onClick} disabled={disabled} {...props}>
			{children}
		</button>
	)
}
