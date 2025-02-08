import { Page } from '../../../components/Page'

export default async function ProjectsPage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	return (
		<Page metaTitle="Project Details" pageTitle={`Project Details - ${decodeURIComponent(id)}`}>
			<ul>
				<li>Project ID: {id}</li>
				<li>Project Name: {decodeURIComponent(id)}</li>
				<li>Project Description: {decodeURIComponent(id)}</li>
				<li>Project Tags: {decodeURIComponent(id)}</li>
				<li>Project BPM: {decodeURIComponent(id)}</li>
			</ul>
		</Page>
	)
}
