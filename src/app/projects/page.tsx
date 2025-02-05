import { ReactNode } from 'react'

import { ProjectData, useGetProjects } from '$/graphql/useProjects'

import { Page } from '../../components/Page'

export default function ProjectsPage() {
	const { data, isLoading, isError, error } = useGetProjects()

	if (isLoading)
		return (
			<Page metaTitle="Arbor Projects" pageTitle="Arbor Projects">
				Loading...
			</Page>
		)

	if (isError) {
		console.log({ error })
		return (
			<Page metaTitle="Arbor Projects" pageTitle="Arbor Projects">
				{error as ReactNode}
			</Page>
		)
	}

	return (
		<Page metaTitle="Arbor Projects" pageTitle="Arbor Projects">
			{data?.projects?.items?.map((project: ProjectData) => <div key={project.id}>{project.id}</div>)}
		</Page>
	)
}
