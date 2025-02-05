type Props = {
	size?: number
}

export function LoadingSpinner({ size }: Props) {
	const className = `text-[--arbor-purple] inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${size ? 'size-' + size : 'size-8'}`

	return (
		<div className="flex items-center justify-center">
			<div className={className} role="status">
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
					Loading...
				</span>
			</div>
		</div>
	)
}
