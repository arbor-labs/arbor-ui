import Head from 'next/head'

import { PageTitle } from './PageTitle'

type Props = {
	metaTitle: string
	pageTitle: string
	subtext?: string
	children: React.ReactNode
}

export function Page({ metaTitle, pageTitle, subtext, children }: Props) {
	return (
		<>
			<Head>
				<title>Arbor | {metaTitle}</title>
			</Head>
			<main className="min-h-[--min-page-height] px-10 py-12">
				<PageTitle title={pageTitle} />
				{subtext && <p className="m-auto mb-10 max-w-[500px] text-center text-xl text-gray-600">{subtext}</p>}
				{children}
			</main>
		</>
	)
}
