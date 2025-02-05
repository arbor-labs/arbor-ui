'use client'

import { ClientError } from 'graphql-request'

import { ErrorMessage } from '$/components/ErrorMessage'
import { LoadingSpinner } from '$/components/LoadingSpinner'
import { NoData } from '$/components/NoData'
import { ProjectData, useGetProjects } from '$/graphql/useProjects'

import { Page } from '../../components/Page'

export default function ProjectsPage() {
	const { data, isLoading, isError, error } = useGetProjects()
	const projects = data?.projects?.items ?? []

	if (isLoading)
		return (
			<Page metaTitle="Arbor Projects" pageTitle="Arbor Projects">
				<div className="flex place-content-center">
					<LoadingSpinner />
				</div>
			</Page>
		)

	if (isError) {
		const e = error as ClientError
		console.error(e.message)
		return (
			<Page metaTitle="Arbor Projects" pageTitle="Arbor Projects">
				<ErrorMessage statusCode={e.response.status} message="An error occurred while fetching projects" />
			</Page>
		)
	}

	return (
		<Page metaTitle="Arbor Projects" pageTitle="Arbor Projects">
			{!projects.length ? (
				<NoData resource="project" tagline="Get started by creating a new project." />
			) : (
				projects.map((p: ProjectData) => {
					return <div key={p.id}>{p.id}</div>
				})
			)}
		</Page>
	)
}
