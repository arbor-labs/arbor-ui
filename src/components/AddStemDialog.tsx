'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { GoDot, GoDotFill } from 'react-icons/go'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { LuAudioLines, LuCirclePlus, LuFileAudio } from 'react-icons/lu'
import { PiMusicNotesPlus } from 'react-icons/pi'
import WaveSurfer from 'wavesurfer.js'

import { EStemType } from '$/lib/constants'
import { useWeb3 } from '$/providers/Web3Provider'
import { getErrorMessage } from '$/utils/getErrorMessage'
import { postFormData } from '$/utils/http'

import { ButtonPrimary, ButtonSecondary } from './Buttons'
import { Notification } from './Notification'
import { VerticalBarSmall } from './ProjectDetails'
import { StemPlayer } from './StemPlayer'

type Props = {
	projectId: string
	disabled: boolean
	bolded?: boolean
	onSuccess: () => void
}

export function AddStemDialog({ projectId, disabled, bolded = false, onSuccess }: Props) {
	const [open, setOpen] = useState(false)
	const [step, setStep] = useState<'upload' | 'preview' | 'details'>('upload')
	const [file, setFile] = useState<File | null>(null)
	const [name, setName] = useState<string>('')
	const [type, setType] = useState<EStemType | null>(null)
	const [previewFile, setPreviewFile] = useState<File | null>(null)
	const [uploading, setUploading] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const { connectedAccount } = useWeb3()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleUploadClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		setFile(e.target.files[0])
	}

	const handleUpload = async () => {
		setSuccessMsg(null)
		setErrorMsg(null)

		try {
			if (!file) {
				setErrorMsg('Please select a file.')
				return
			}

			// Setup payload
			setUploading(true)
			const formData = new FormData()
			formData.append('file', file)
			// UploadFileDto
			formData.append('name', name ?? 'preview')
			formData.append('type', type ?? EStemType.OTHER)
			formData.append('projectId', projectId)
			formData.append('createdBy', String(connectedAccount?.address))

			// Make request
			const res = await postFormData(`/project/${projectId}/preview`, formData)
			if (res) {
				// Move to next step, preview it in a stem player
				setUploading(false)
				setPreviewFile(new File([Buffer.from(res.outputData)], 'preview.wav'))
				setStep('preview')
			} else {
				setErrorMsg(getErrorMessage(res.message))
			}
		} catch (e) {
			console.error(e)
			setErrorMsg(getErrorMessage(e))
			setUploading(false)
		}
	}

	// TODO: show status along each step of the backend
	const handleAddStem = async () => {
		setSuccessMsg(null)
		setErrorMsg(null)
		setUploading(true)

		try {
			if (!name || !type || !file) {
				if (!name || !type) setErrorMsg('Please fill out all fields.')
				if (!file) setErrorMsg('No preview file found. Please upload a file first.')
				setUploading(false)
				return
			}

			const formData = new FormData()
			formData.append('stemFile', file)

			// UploadFileDto
			formData.append('name', name ?? 'Preview')
			formData.append('type', type ?? EStemType.OTHER)
			formData.append('projectId', projectId)
			formData.append('createdBy', String(connectedAccount?.address))

			// POST
			const res = await postFormData(`/project/${projectId}/add-stem`, formData)
			if (res) {
				setSuccessMsg('The new stem has been added to the project and pinned by Pinata on IPFS.')
				onSuccess()
				handleClose()
			} else {
				throw new Error('Failed to add stem')
			}
		} catch (e) {
			console.error(e)
			setErrorMsg(getErrorMessage(e))
			setUploading(false)
		}
	}

	const handleClose = () => {
		setOpen(false)
		setName('')
		setType(null)
		setFile(null)
		setUploading(false)
		setStep('upload')
	}

	return (
		<>
			<div className="relative">
				{bolded && <VerticalBarSmall />}
				<button
					className={`inline-flex items-center rounded border-[--arbor-black] px-3 py-1 font-semibold hover:border-[--arbor-gray-gray] hover:bg-gray-200 hover:text-[--arbor-gray] disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:text-gray-300 ${bolded ? 'border-4' : 'border-2'}`}
					onClick={() => setOpen(true)}
					disabled={disabled}
				>
					<LuCirclePlus className="mr-1 size-6" /> Add Stem
				</button>
			</div>
			<Dialog open={open} onClose={setOpen} className="relative z-10">
				<DialogBackdrop
					transition
					className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/75 transition-opacity"
				/>
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<DialogPanel
							transition
							className="data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95 relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
						>
							<div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
								<button
									type="button"
									onClick={handleClose}
									className="focus:outline-hidden rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									<span className="sr-only">Close</span>
									<CgClose aria-hidden="true" className="size-6" />
								</button>
							</div>
							{step === 'upload' && (
								<>
									<div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-[--arbor-red]">
										<HiOutlineCloudUpload
											aria-hidden="true"
											className={`size-6 text-[--arbor-red] ${uploading ? 'animate-spin' : ''}`}
										/>
									</div>
									<div className="mt-3 text-center sm:mt-5">
										<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
											Choose an audio file
										</DialogTitle>
										<div className="mt-2">
											<p className="mb-2 text-sm text-gray-500">Add a new stem to collaborate on this project.</p>
											<p className="mb-2 text-sm italic text-gray-500">
												Arbor supports only <code>.wav</code> formats that are less than <code>20MB</code> in size.
											</p>
										</div>
									</div>
									<div className="py-4">
										<label htmlFor="type" className="mb-2 block text-sm font-semibold">
											File Upload
										</label>
										<div className="flex items-center overflow-hidden rounded-md border-2 border-[--arbor-black]">
											<input
												ref={fileInputRef}
												id="file"
												name="file"
												type="file"
												accept="audio/wav"
												onChange={handleFileChange}
												className="hidden"
												disabled={uploading}
												required
											/>
											<ButtonPrimary
												className="rounded-none border-y-0 border-l-0"
												color="purple"
												onClick={handleUploadClick}
											>
												{file ? 'Change File' : 'Choose File'}
											</ButtonPrimary>
											<LuFileAudio
												aria-hidden="true"
												className="pointer-events-none size-8 self-center pl-2 text-gray-400"
											/>
											<p className="pl-2 text-left">{file?.name ?? '/sick-bass-drop.wav'}</p>
										</div>
										{!file && errorMsg && <p className="mt-1 text-sm text-red-600">File is required</p>}
									</div>
								</>
							)}
							{step === 'preview' && (
								<>
									<div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-[--arbor-red]">
										<LuAudioLines aria-hidden="true" className="size-6 text-[--arbor-red]" />
									</div>
									<div className="mt-3 text-center sm:mt-5">
										<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
											Preview your new stem
										</DialogTitle>
										<div className="mt-2">
											<p className="mb-2 text-sm text-gray-500">
												This is what your stem sounds like when combined with the project&apos;s existing material.
											</p>
											<p className="mb-2 text-sm italic text-gray-500">
												Does it sound good? If not, go back and pick another stem.
											</p>
										</div>
									</div>
									<div className="py-4">
										<StemPlayer
											idx={1}
											isPreview
											previewFile={previewFile ?? undefined}
											onInit={(_idx: number, _wavesurfer: WaveSurfer) => undefined}
										/>
									</div>
								</>
							)}
							{step === 'details' && (
								<>
									<div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-[--arbor-red]">
										<PiMusicNotesPlus
											aria-hidden="true"
											className={`size-6 text-[--arbor-red] ${uploading ? 'animate-spin' : ''}`}
										/>
									</div>
									<div className="mt-3 text-center sm:mt-5">
										<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
											{uploading ? 'This may take a minute' : 'Add in some details'}
										</DialogTitle>
										<div className="mt-2">
											{uploading ? (
												<>
													<p className="mb-2 text-sm text-gray-500">
														Sit back and relaxwhile we make some magic happen.
													</p>
													<p className="mb-2 text-sm text-gray-500">
														Merging files together, uploading metadata and audio to IPFS, creating a project revision...
													</p>
												</>
											) : (
												<p className="mb-2 text-sm text-gray-500">
													The file will be stored in a decentralized manner in IPFS. If you aren&apos;t familiar with
													IPFS, you can{' '}
													<a
														className="underline hover:text-[--arbor-pink]"
														href="https://docs.ipfs.tech/concepts/ipfs-solves/"
														target="_blank"
													>
														read about the benefits
													</a>{' '}
													of why it&apos;s the best way to store files.
												</p>
											)}
										</div>
									</div>
									<div className="py-4">
										<div className="mb-6">
											<label htmlFor="name" className="mb-2 block text-sm font-semibold">
												Stem Name
											</label>
											<input
												id="name"
												name="name"
												type="text"
												value={name}
												onChange={e => setName(e.target.value)}
												placeholder="Stem name"
												className="w-full rounded-md border-2 border-gray-300 px-3 py-2 focus:border-[--arbor-pink] focus:outline-none"
												disabled={uploading}
												required
											/>
											{!name && errorMsg && <p className="mt-1 text-sm text-red-600">Name is required</p>}
										</div>
										<div>
											<label htmlFor="type" className="mb-2 block text-sm font-semibold">
												Stem Type
											</label>
											<select
												id="type"
												name="type"
												value={type || ''}
												onChange={e => setType(e.target.value as EStemType)}
												className="block w-full rounded-md border-2 border-gray-300 px-3 py-2 focus:border-[--arbor-pink] focus:outline-none"
												disabled={uploading}
												required
											>
												<option value="" disabled>
													Select stem type
												</option>
												{Object.values(EStemType).map(stemType => (
													<option key={stemType} value={stemType}>
														{stemType.charAt(0).toUpperCase() + stemType.slice(1)}
													</option>
												))}
											</select>
											{!type && errorMsg && <p className="mt-1 text-sm text-red-600">Type is required</p>}
										</div>
									</div>
								</>
							)}
							<div className="mb-4 flex items-center justify-center">
								{step === 'upload' ? (
									<GoDotFill className={`size-6 text-gray-500`} />
								) : (
									<GoDot className={`size-6 text-gray-500`} />
								)}
								{step === 'preview' ? (
									<GoDotFill className={`size-6 text-gray-500`} />
								) : (
									<GoDot className={`size-6 text-gray-500`} />
								)}
								{step === 'details' ? (
									<GoDotFill className={`size-6 text-gray-500`} />
								) : (
									<GoDot className={`size-6 text-gray-500`} />
								)}
							</div>
							<div className="flex items-center justify-between space-x-2">
								{step === 'upload' && (
									<>
										<ButtonSecondary className="w-full" disabled={uploading} onClick={handleClose}>
											Cancel
										</ButtonSecondary>
										<ButtonPrimary className="w-full" color="pink" disabled={uploading || !file} onClick={handleUpload}>
											{uploading ? 'Creating Preview...' : 'Preview'}
										</ButtonPrimary>
									</>
								)}
								{step === 'preview' && (
									<>
										<ButtonSecondary className="w-full" disabled={uploading} onClick={() => setStep('upload')}>
											Back
										</ButtonSecondary>
										<ButtonPrimary className="w-full" color="pink" onClick={() => setStep('details')}>
											Sounds Good
										</ButtonPrimary>
									</>
								)}
								{step === 'details' && (
									<>
										{/* TODO: show status along each step of the backend */}
										<ButtonSecondary className="w-full" disabled={uploading} onClick={() => setStep('preview')}>
											Back
										</ButtonSecondary>
										<ButtonPrimary className="w-full" color="pink" disabled={uploading} onClick={handleAddStem}>
											{uploading ? 'Making Music...' : 'Add Stem'}
										</ButtonPrimary>
									</>
								)}
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
			{errorMsg && (
				<Notification
					isOpen
					variant="error"
					title="An error occurred while uploading a stem"
					text={errorMsg}
					onClose={() => setErrorMsg(null)}
				/>
			)}
			{successMsg && (
				<Notification
					isOpen
					variant="success"
					title="Successfully added to project!"
					text={successMsg}
					onClose={() => setSuccessMsg(null)}
				/>
			)}
		</>
	)
}
