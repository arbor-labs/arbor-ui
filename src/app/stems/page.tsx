'use client'

import { ClientError } from 'graphql-request'

import { ErrorMessage } from '$/components/ErrorMessage'
import { LoadingSpinner } from '$/components/LoadingSpinner'
import { NoData } from '$/components/NoData'
import { StemCard } from '$/components/StemCard'
import { type StemCardData, useStemsList } from '$/graphql/hooks/useStemsList'

import { Page } from '../../components/Page'

export default function StemsListPage() {
	const { data, isLoading, isError, error } = useStemsList()
	const stems = data?.stems?.items ?? []

	if (isLoading)
		return (
			<Page
				metaTitle="Arbor Stems"
				pageTitle="Arbor Stems"
				subtext="Explore the stem pool for unique music stems from the artist community, upload your own, or grab a few and start a new project with them."
			>
				<div className="flex place-content-center">
					<LoadingSpinner />
				</div>
			</Page>
		)

	if (isError) {
		const e = error as ClientError
		console.error(e.message)
		return (
			<Page
				metaTitle="Arbor Stems"
				pageTitle="Arbor Stems"
				subtext="Explore the stem pool for unique music stems from the artist community, upload your own, or grab a few and start a new project with them."
			>
				<ErrorMessage statusCode={e.response.status} message="An error occurred while fetching stems" />
			</Page>
		)
	}

	return (
		<Page
			metaTitle="Arbor Stems"
			pageTitle="Arbor Stems"
			subtext="Explore the stem pool for unique music stems from the artist community, upload your own, or grab a few and start a new project with them."
		>
			{!stems.length ? (
				<NoData
					resource="stem"
					tagline="Get started by contributing stems to a project."
					buttonHref="/projects/create"
				/>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{stems.map((s: StemCardData) => {
						return <StemCard key={s.id} stem={s} />
					})}
				</div>
			)}
		</Page>
	)
}
