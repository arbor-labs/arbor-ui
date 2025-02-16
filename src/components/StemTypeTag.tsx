import { EStemType, STEM_COLORS } from '$/lib/constants'

type Props = {
	type: EStemType | string
	className?: string
}

export function StemTypeTag({ type, className = '' }: Props) {
	return (
		<div
			className={`rounded-md border-2 border-[--arbor-black] px-2 py-1 text-sm font-bold uppercase text-[--arbor-white] [text-shadow:_1.5px_1.5px_0px_rgba(0,0,0,1)] ${className}`}
			style={{ backgroundColor: STEM_COLORS[type] }}
		>
			{type}
		</div>
	)
}
