import { PageTitle } from './PageTitle'

type PropTypes = {
	title: string
	children: React.ReactNode
}

export function Page({ title, children }: PropTypes) {
	return (
		<main className="min-h-[--min-page-height] px-10 py-12">
			<PageTitle title={title} />
			{children}
		</main>
	)
}
