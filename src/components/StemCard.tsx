import Link from 'next/link'
import { LuFileAudio } from 'react-icons/lu'

import { STEM_COLORS } from '$/lib/constants'
import { formatAddress } from '$/utils/formatAddress'
import { formatDate } from '$/utils/formatDate'
import { formatStemName } from '$/utils/formatStem'

type Props = {
	stem: {
		id: string
		name: string
		type: string
		createdAt: string | Date
		createdBy: {
			address: string
		}
		projectsAddedTo: Array<{
			id: string
			name: string
		}>
	}
}

export function StemCard({ stem }: Props) {
	return (
		<div className="flex flex-col overflow-hidden rounded-lg border-2 border-[--arbor-black] bg-white">
			{/* Card Header */}
			<div className="flex items-center justify-between bg-[--arbor-black] px-4 py-2">
				<div className="flex items-center space-x-2">
					<LuFileAudio className="size-5 text-[--arbor-white]" />
					<div
						className="rounded-md border-2 border-[--arbor-black] px-1.5 py-0.5 text-xs font-bold uppercase text-[--arbor-white] [text-shadow:_1px_1px_1px_rgba(0,0,0,0.5)]"
						style={{ backgroundColor: STEM_COLORS[stem.type] }}
					>
						{stem.type}
					</div>
				</div>
				<Link
					href={`/stems/${stem.id}`}
					className="text-sm font-light italic text-[--arbor-white] hover:text-[--arbor-pink]"
				>
					View Details →
				</Link>
			</div>

			{/* Card Content */}
			<div className="flex grow flex-col p-4">
				<div className="mb-2">
					<Link href={`/stems/${stem.id}`} className="hover:text-[--arbor-pink]">
						<h3 className="text-xl font-bold">{formatStemName(stem.name)}</h3>
					</Link>
					<p className="text-sm font-light italic text-gray-600">
						Created by{' '}
						<Link href={`/users/${stem.createdBy.address}`} className="hover:text-[--arbor-pink]">
							{formatAddress(stem.createdBy.address)}
						</Link>{' '}
						on {formatDate(stem.createdAt)}
					</p>
				</div>

				<div className="mt-auto">
					<p className="text-sm text-gray-600">
						Used in {stem.projectsAddedTo.length} project{stem.projectsAddedTo.length === 1 ? '' : 's'}
					</p>
					{stem.projectsAddedTo.length > 0 && (
						<div className="mt-1 text-sm italic">
							{stem.projectsAddedTo.map((project, idx) => (
								<span key={project.id}>
									{idx > 0 && ', '}
									<Link href={`/projects/${project.id}`} className="hover:text-[--arbor-pink]">
										{project.name}
									</Link>
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
