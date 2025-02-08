'use client'
// import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'

import { ButtonPrimary } from '$/components/Buttons'
import { LoadingSpinner } from '$/components/LoadingSpinner'
import { Notification } from '$/components/Notification'
import { Page } from '$/components/Page'
import TagsInput from '$/components/TagsInput'
import { useCreateProject } from '$/graphql/hooks/useCreateProject'
import { useWeb3 } from '$/providers/Web3Provider'

export default function ProjectCreatePage() {
	const router = useRouter()
	const { connectedAccount } = useWeb3()

	// Mutation
	const { mutateAsync: createProject, isPending, isSuccess, isError, data, error } = useCreateProject()

	// Form State
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [bpm, setBpm] = useState<number>(120)
	const [trackLimit, setTrackLimit] = useState<number>(10)
	const [tags, setTags] = useState<string[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')

	// Form Field Handlers
	const handleSetBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Enforce the bounds of 0,300
		let val = parseInt(e.target.value)
		if (val < 0) val = 0
		if (val > 300) val = 300
		setBpm(val)
	}
	const handleSetTrackLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Enforce the bounds of 0,20
		let val = parseInt(e.target.value)
		if (val < 0) val = 0
		if (val > 1000) val = 20
		setTrackLimit(val)
	}

	const handleSubmit = async () => {
		try {
			if (!connectedAccount?.address) {
				setErrorOpen(true)
				setErrorMsg('Please connect your Web3 wallet')
				return
			}

			if (!name || !bpm || !trackLimit) {
				setErrorOpen(true)
				setErrorMsg('Please enter in the required fields')
				return
			}
			setLoading(true)

			/*
				Create new Semaphore group for given project
				- Create new group with project creator as group admin
				- Do not add in the project creator as a voting member (yet)
				- Future users will register to vote, which will add them in as group members
			*/
			// const contractRes = await contracts.stemQueue.createProjectGroup(20, BigInt(0), address, {
			// 	from: address,
			// 	gasLimit: 2000000,
			// })

			// if (!contractRes) throw new Error('Failed to create on-chain Semaphore group for given project')
			// const receipt = await contractRes.wait()
			// const votingGroupId = receipt.events[1].args.groupId.toString()

			// POST new project record to backend
			const payload = {
				createdBy: connectedAccount.address,
				name,
				description,
				bpm,
				tags,
				trackLimit,
			}
			console.log('posting data...', payload)

			await createProject({ createProjectInput: payload })

			// console.log({ data, error, isSuccess, isPending, isError })
			if (isSuccess)
				if (!isError && error) {
					// Redirect to project page if successful
					setSuccessOpen(true)
					resetForm()
					setTimeout(() => router.push(`/projects/${payload.name}`), 3000)
				}
			setLoading(false)
		} catch (e: unknown) {
			setLoading(false)
			setErrorOpen(true)
			console.error({ error })
			if (e instanceof Error) {
				console.log(`Project creation failed - ${e.message}`)
				setErrorMsg(e.message)
			} else {
				console.log('Project creation failed')
			}
		}
	}

	const resetForm = () => {
		setName('')
		setDescription('')
		setBpm(120)
		setTrackLimit(10)
		setTags([])
	}

	const onNotificationClose = () => {
		setSuccessOpen(false)
		setErrorOpen(false)
		setErrorMsg('')
	}

	return (
		<Page metaTitle="Create A New Project" pageTitle="Create a New Project">
			<div className="m-auto sm:container">
				<div className="m-auto mb-12 max-w-[500px] text-center">
					<p className="mb-2 text-lg">
						Start a new project of your own so you can start uploading music stems and creating music!
					</p>
					<p className="text-lg">
						You can decide to be specific on what your project&apos;s direction and constraints are, or choose to be
						completely open without guardrails. It&apos;s all your choice.
					</p>
				</div>
				<div className="m-auto max-w-[800px]">
					<div className="mb-6">
						<label htmlFor="name" className="mb-1 block font-bold">
							Name
						</label>
						<input
							id="project-name"
							type="text"
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Give it a catchy name!"
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="project-description" className="mb-1 block font-bold">
							Description
						</label>
						<textarea
							id="project-description"
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Describe what your vision for this project is so that collaborators have a guiding star."
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="project-track-limit" className="mb-1 block font-bold">
							Tags
						</label>
						<TagsInput
							tags={tags}
							onAdd={tag => setTags([...tags, tag])}
							onDelete={tag => setTags(tags.filter(t => t !== tag))}
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="project-bpm" className="mb-1 block font-bold">
							BPM
						</label>
						<input
							id="project-bpm"
							type="number"
							className="w-full rounded border border-gray-300 p-2"
							placeholder="What BPM is this project targetting?"
							value={bpm}
							onChange={handleSetBpm}
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="project-track-limit" className="mb-1 block font-bold">
							Track Limit
						</label>
						<input
							id="project-track-limit"
							type="number"
							className="w-full rounded border border-gray-300 p-2"
							placeholder="Set a maximum limit of tracks that can be uploaded to this project."
							value={trackLimit}
							onChange={handleSetTrackLimit}
							required
						/>
					</div>
					<div className="flex justify-center">
						<ButtonPrimary color="pink" disabled={loading} onClick={handleSubmit}>
							{loading ? <LoadingSpinner /> : 'Create Project'}
						</ButtonPrimary>
					</div>
				</div>
				{successOpen && (
					<Notification
						isOpen
						variant="success"
						title="Successfully created a project!"
						text="Redirecting to the new project details page..."
						onClose={onNotificationClose}
					/>
				)}
				{errorOpen && (
					<Notification
						isOpen
						variant="error"
						title="An error occurred creating the project"
						text={errorMsg}
						onClose={onNotificationClose}
					/>
				)}
			</div>
		</Page>
	)
}
