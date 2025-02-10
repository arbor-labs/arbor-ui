import { ProjectDetails } from '$/components/ProjectDetails'

import { Page } from '../../../components/Page'

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<Page metaTitle="Project Details" pageTitle="Project Details">
			<ProjectDetails id={id} />
		</Page>
	)
}
