import Link from 'next/link'
import { MdQueueMusic } from 'react-icons/md'

import { ProjectData } from '$/graphql/hooks/useProjects'

type Props = {
	project: ProjectData
}

export function ProjectCard({ project }: Props) {
	const limitReached = project.stems.length >= project.trackLimit

	return (
		<div className="relative overflow-visible rounded-lg border-2 border-[--arbor-black]">
			{limitReached && (
				<div className="absolute -right-4 top-5 z-10 rounded-full bg-[--arbor-purple] px-2 py-1 text-xs font-bold uppercase text-[--arbor-white]">
					Track Limit Reached
				</div>
			)}
			<div className="rounded-t-md border-b-2 border-[--arbor-black] bg-gradient-to-r from-[--arbor-red] to-[--arbor-pink] px-1.5 py-1">
				<MdQueueMusic className="text-2xl text-[--arbor-white]" />
			</div>
			<div className="p-4">
				<h5 className="mb-2 text-xl font-bold">{project.name}</h5>
				<p className="mb-1 font-semibold uppercase text-gray-700">
					{project.stems.length} Stem{project.stems.length === 1 ? '' : 's'} • {project.trackLimit} Stem Max •{' '}
					{/* {project.collaborators.length} Collaborator{project.collaborators.length === 1 ? '' : 's'} */}
				</p>
				<p className="mb-2 font-light">{project.description.slice(0, 60) + '...'}</p>
				{project.tags &&
					project.tags.length > 0 &&
					project.tags.map((tag: string) => (
						<span
							key={tag}
							className="bg-secondary m-1 inline-block rounded-full px-3 py-1 text-sm text-[--arbor-white]"
						>
							{tag}
						</span>
					))}
			</div>
			<div className="flex justify-end p-4">
				<Link
					href={`/projects/${project.id}`}
					className="rounded bg-[--arbor-pink] px-4 py-2 text-[--arbor-white] hover:bg-[--arbor-pink-hover]"
				>
					View Details
				</Link>
			</div>
		</div>
	)
}
