import Head from 'next/head'

import { PageTitle } from './PageTitle'

type Props = {
	metaTitle: string
	pageTitle: string
	children: React.ReactNode
}

export function Page({ metaTitle, pageTitle, children }: Props) {
	return (
		<>
			<Head>
				<title>Arbor | {metaTitle}</title>
			</Head>
			<main className="min-h-[--min-page-height] px-10 py-12">
				<PageTitle title={pageTitle} />
				{children}
			</main>
		</>
	)
}
