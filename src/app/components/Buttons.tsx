type PropTypes = {
	color?: 'red' | 'pink' | 'purple' | 'peach'
	children: React.ReactNode
	onClick?: () => void
	disabled?: boolean
}

export function ButtonPrimary({ children, color, onClick, disabled }: PropTypes) {
	let className = 'inline-block rounded-md px-3 py-2 text-sm text-[--arbor-white] font-[800] uppercase italic '
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
		<button type="button" className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}
