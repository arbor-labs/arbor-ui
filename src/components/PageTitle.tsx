type PropTypes = {
	title: string
}

export function PageTitle({ title }: PropTypes) {
	return (
		<h2 className="after:content separator-md mb-8 text-center text-2xl font-[800] uppercase italic sm:text-4xl lg:text-5xl">
			{title}
		</h2>
	)
}
