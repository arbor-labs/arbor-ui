'use client'

import { useProjectDetails } from '$/graphql/hooks/useProjectDetails'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'

type Props = {
	id: string
}

export function ProjectDetails({ id }: Props) {
	const { data, isLoading, isError, error } = useProjectDetails(id)

	if (isLoading)
		return (
			<div className="flex place-content-center">
				<LoadingSpinner />
			</div>
		)

	if (isError) {
		return (
			<>
				<ErrorMessage message="This project may not exist. Please check the URL and try again." />
				<Notification
					isOpen
					variant="error"
					title="An error occurred getting the project details"
					text={getErrorMessage(error)}
				/>
			</>
		)
	}

	if (data) {
		const { project } = data
		return (
			<div className="flex flex-col items-center">
				<div className="mb-2 text-center font-extrabold uppercase italic">{project.name}</div>
				<div className="mb-7 text-center font-light italic">{project.description}</div>
				{project.stems?.length === 0 ? (
					<div className="border-3 rounded-b-lg border-t-0 border-black px-2 py-3 text-center">
						No stems to show, upload one!
					</div>
				) : (
					<div className="flex flex-col items-center">
						<div className="mb-3 flex items-center justify-center">
							<button className="flex size-24 items-center justify-center rounded-full bg-black text-white">
								{/* Play/Pause Icon */}
							</button>
						</div>
						<div className="mb-3 flex flex-col items-center">
							<div className="text-center font-light uppercase italic">{`Created by ${project.createdBy}`}</div>
							<div className="mb-1 text-4xl">{project.name}</div>
							<div className="mb-1 flex items-center justify-center">
								<div className="mr-5">{`BPM: ${project.bpm}`}</div>
								<div className="mr-5">{`Track Limit: ${project.trackLimit}`}</div>
								<div>{`Open To: Anyone`}</div>
							</div>
							<div className="mb-2 text-lg text-gray-700">{project.description}</div>
							{project.tags.map(tag => (
								<span key={tag} className="m-1 font-medium">
									{tag}
								</span>
							))}
						</div>
						<div className="mt-3 flex items-center justify-center">
							<button className="w-56 bg-black text-2xl font-extrabold italic tracking-wider text-white">
								Mint & Buy
							</button>
							<div className="flex items-center pl-3">
								<img src="/harmony_icon.svg" alt="Currency" className="size-8" />
								<div className="ml-1 text-4xl">
									0.01 <span className="text-lg text-gray-400">ETH</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}
}
