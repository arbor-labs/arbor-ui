type Props = {
	tag: string
}
export function ProjectTag({ tag }: Props) {
	return (
		<span
			key={tag}
			className="my-1 mr-2 inline-block rounded-full bg-[--arbor-purple] px-3 py-1 text-sm font-semibold text-[--arbor-white]"
		>
			{tag}
		</span>
	)
}
