'use client'

import { Address } from 'viem'

import { useUserDetails } from '$/graphql/hooks/useUserDetails'
import { formatDate } from '$/utils/formatDate'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'
import { ProjectCard } from './ProjectCard'
import { StemCard } from './StemCard'
import { UserAvatar } from './UserAvatar'

type Props = {
	address: Address
}

export function UserDetails({ address }: Props) {
	const { data, isLoading, isError, error } = useUserDetails(address)

	if (isLoading)
		return (
			<div className="flex place-content-center">
				<LoadingSpinner />
			</div>
		)

	if (isError) {
		return (
			<>
				<ErrorMessage message="This user may not exist, or the server may be down. Please try again." />
				<Notification
					isOpen
					variant="error"
					title="An error occurred getting the user details"
					text={getErrorMessage(error)}
				/>
			</>
		)
	}

	if (data?.account) {
		const { account } = data
		const createdProjectsLength = account.createdProjects?.length ?? 0
		const collaboratedProjectsLength = account.collaboratedProjects?.length ?? 0
		const uploadedStemsLength = account.uploadedStems?.length ?? 0

		return (
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header section */}
				<div className="relative flex items-start justify-start">
					<div className="mr-6 h-full w-24 sm:mr-4">
						<UserAvatar
							avatarUri={account.avatarUri}
							size="profile"
							className="rounded-xl border-2 border-[--arbor-black]"
						/>
					</div>
					{/* Metadata */}
					<div className="grow">
						<div>
							<p className="font-light uppercase italic text-gray-700">{account.address}</p>
							<div className="mb-4 flex items-center space-x-4">
								<h2 className="text-5xl font-bold">{account.displayName || 'Anonymous User'}</h2>
							</div>
						</div>
						<div className="mb-4 space-y-2 text-lg font-light text-gray-500">
							<p>
								<span className="font-medium text-gray-700">Joined On:</span> {formatDate(account.createdAt)}
							</p>
							<p>
								<span className="font-medium text-gray-700">Last Activity:</span> {formatDate(account.updatedAt)}
							</p>
							<p>
								<span className="font-medium text-gray-700">Projects Created:</span>{' '}
								{account.createdProjects?.length ?? 0}
							</p>
							<p>
								<span className="font-medium text-gray-700">Projects Collaborated On:</span>{' '}
								{account.collaboratedProjects?.length ?? 0}
							</p>
							<p>
								<span className="font-medium text-gray-700">Stems Uploaded:</span> {account.uploadedStems?.length ?? 0}
							</p>
						</div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Created Projects */}
					<div>
						<h3 className="mb-4 text-2xl font-bold">Creations ({createdProjectsLength})</h3>
						<div className="space-y-4">
							{createdProjectsLength > 0 ? (
								account.createdProjects?.map(project => <ProjectCard key={project.id} project={project} />)
							) : (
								<p className="text-gray-500">No projects created yet</p>
							)}
						</div>
					</div>
					{/* Collaborated Projects */}
					<div>
						<h3 className="mb-4 text-2xl font-bold">Collaborations ({collaboratedProjectsLength})</h3>
						<div className="space-y-4">
							{collaboratedProjectsLength > 0 ? (
								account.collaboratedProjects?.map(project => <ProjectCard key={project.id} project={project} />)
							) : (
								<p className="text-gray-500">No project collaborations yet</p>
							)}
						</div>
					</div>
					{/* Uploaded Stems */}
					<div>
						<h3 className="mb-4 text-2xl font-bold">Stems ({uploadedStemsLength})</h3>
						<div className="space-y-4">
							{uploadedStemsLength > 0 ? (
								account.uploadedStems?.map(stem => <StemCard key={stem.id} stem={stem} />)
							) : (
								<p className="text-gray-500">No stems uploaded yet</p>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
