'use client'

import { ClientError } from 'graphql-request'

import { ErrorMessage } from '$/components/ErrorMessage'
import { LoadingSpinner } from '$/components/LoadingSpinner'
import { NoData } from '$/components/NoData'
import { ProjectCard } from '$/components/ProjectCard'
import { type ProjectCardData, useGetProjects } from '$/graphql/hooks/useProjects'

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
				<NoData resource="project" tagline="Get started by creating a new project." buttonHref="/projects/create" />
			) : (
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{projects.map((p: ProjectCardData) => {
						return <ProjectCard key={p.id} project={p} />
					})}
				</div>
			)}
		</Page>
	)
}
