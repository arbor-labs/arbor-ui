import { Dialog, DialogPanel } from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { LuUsers } from 'react-icons/lu'

import { type ProjectCollaboratorsData, type ProjectStemData } from '$/graphql/hooks/useProjectDetails'
import { formatAddress } from '$/utils/formatAddress'

import { ButtonOutline, ButtonSecondary } from './Buttons'
import { StemTypeTag } from './StemTypeTag'
import { UserAvatar } from './UserAvatar'

type Props = {
	collaborators: ProjectCollaboratorsData
	stems: ProjectStemData[]
	disabled?: boolean
}

export function ProjectCollaboratorsDialog({ collaborators, stems, disabled }: Props) {
	const [open, setOpen] = useState(false)

	// Group stems by collaborator address
	const stemsByCollaborator = stems.reduce(
		(acc, stem) => {
			const address = stem.createdBy.address
			if (!acc[address]) {
				acc[address] = []
			}
			acc[address].push(stem)
			return acc
		},
		{} as Record<string, ProjectStemData[]>,
	)

	return (
		<>
			<ButtonOutline
				icon={<LuUsers className="mr-2 size-5" />}
				onClick={() => setOpen(true)}
				disabled={disabled || open}
			>
				View Collaborators
			</ButtonOutline>
			<Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="mx-auto w-full max-w-2xl rounded-lg bg-white p-6">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-2xl font-bold">Project Collaborators ({collaborators.length})</h3>
							<button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
								<CgClose className="size-6" />
							</button>
						</div>

						<div className="max-h-[60vh] space-y-4 overflow-y-auto">
							{collaborators.map(collaborator => (
								<div key={collaborator.id} className="rounded-lg border-2 border-[--arbor-black]">
									<div className="mb-4 flex items-center gap-2 px-4 pt-4">
										<UserAvatar avatarUri={collaborator.avatarUri} size="md" />
										<div className="align-base">
											<Link
												href={`/users/${collaborator.address}`}
												className="text-lg font-semibold hover:text-[--arbor-pink]"
											>
												{formatAddress(collaborator.address)}{' '}
											</Link>
											<span className="text-md font-normal italic">
												has uploaded {stemsByCollaborator[collaborator.address]?.length} stem
												{stemsByCollaborator[collaborator.address]?.length === 1 ? '' : 's'}
											</span>
										</div>
									</div>
									<div className="mb-1 flex justify-between gap-2 px-4">
										<div className="text-sm font-semibold uppercase italic text-gray-500">Stem Name</div>
										<div className="text-sm font-semibold uppercase italic text-gray-500">Stem Type</div>
									</div>
									<ul role="list" className="divide-y divide-gray-300 border-t-2">
										{stemsByCollaborator[collaborator.address]?.map(stem => (
											<Link
												key={stem.id}
												href={`/stems/${stem.id}`}
												className="block text-[--arbor-gray] hover:bg-gray-100 hover:text-[--arbor-pink] hover:last:rounded-b-lg"
											>
												<li className="flex items-center justify-between px-4 py-2">
													<div className="font-semibold">{stem.name}</div>
													<StemTypeTag type={stem.type} />
												</li>
											</Link>
										))}
									</ul>
								</div>
							))}
						</div>

						<div className="mt-6 flex justify-end">
							<ButtonSecondary onClick={() => setOpen(false)}>Close</ButtonSecondary>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}
