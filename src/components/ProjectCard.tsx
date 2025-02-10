import Link from 'next/link'
import { MdQueueMusic } from 'react-icons/md'

import { type ProjectCardData } from '$/graphql/hooks/useProjects'

import { ButtonPrimary } from './Buttons'

type Props = {
	project: ProjectCardData
}

export function ProjectCard({ project }: Props) {
	const limitReached = (project.stems?.length ?? 0) >= project.trackLimit

	return (
		<div className="relative overflow-visible rounded-lg border-2 border-[--arbor-black]">
			{limitReached && (
				<div className="absolute -right-4 top-5 z-10 rounded-full border-2 border-[--arbor-black] bg-[--arbor-black] px-2 py-1 text-xs font-bold uppercase text-[--arbor-white]">
					Track Limit Reached!
				</div>
			)}
			<div className="rounded-t-md border-b-2 border-[--arbor-black] bg-gradient-to-r from-[--arbor-red] to-[--arbor-pink] px-1.5 py-1">
				<MdQueueMusic className="text-2xl text-[--arbor-white]" />
			</div>
			<div className="p-4">
				<h5 className="mb-2 text-xl font-bold">{project.name}</h5>
				<p className="mb-1 font-semibold uppercase text-gray-700">
					{project.stems?.length ?? 0} Stem{project.stems?.length === 1 ? '' : 's'} • {project.trackLimit} Track Limit •{' '}
					{/* {project.collaborators.length} Collaborator{project.collaborators.length === 1 ? '' : 's'} */}
				</p>
				<p className="mb-2 font-light">{project.description.slice(0, 60) + '...'}</p>
				{project.tags.map((tag: string) => (
					<span
						key={tag}
						className="my-1 mr-2 inline-block rounded-full bg-[--arbor-purple] px-3 py-1 text-sm font-semibold text-[--arbor-white]"
					>
						{tag}
					</span>
				))}
			</div>
			<div className="flex justify-end p-4">
				<Link href={`/projects/${project.id}`}>
					<ButtonPrimary color="pink">View Details</ButtonPrimary>
				</Link>
			</div>
		</div>
	)
}
