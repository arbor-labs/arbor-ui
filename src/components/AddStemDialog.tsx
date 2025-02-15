'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { LuCirclePlus } from 'react-icons/lu'
import { LuFileAudio } from 'react-icons/lu'

import { EStemType } from '$/lib/constants'
import { useWeb3 } from '$/providers/Web3Provider'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { ButtonPrimary, ButtonSecondary } from './Buttons'
import { Notification } from './Notification'
import { VerticalBarSmall } from './ProjectDetails'

type Props = {
	projectId: string
	disabled: boolean
}

export function AddStemDialog({ projectId, disabled }: Props) {
	const [open, setOpen] = useState(false)
	const [file, setFile] = useState<File | null>(null)
	const [name, setName] = useState<string>('')
	const [type, setType] = useState<EStemType | null>(null)
	const [uploading, setUploading] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const { connectedAccount } = useWeb3()

	const handleUpload = async () => {
		setSuccessMsg(null)
		setErrorMsg(null)

		try {
			if (!name || !type || !file) {
				setErrorMsg('Please fill in all required fields.')
				return
			}

			// Setup payload
			setUploading(true)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('name', name)
			formData.append('type', type)
			formData.append('projectId', projectId)
			formData.append('createdBy', String(connectedAccount?.address))
			// Make request
			const resp = await fetch('http://localhost:5280/pinata/upload', {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			})
			// Inspect response
			const data = await resp.json()
			if (resp.ok) {
				console.log('upload success', { data })
				setSuccessMsg('The new stem has been added to the project and pinned by Pinata on IPFS.')
			} else {
				throw new Error(data.message)
			}
			setOpen(false)
		} catch (e) {
			console.error(e)
			setErrorMsg(getErrorMessage(e))
			handleClose()
		} finally {
			setUploading(false)
		}
	}

	const handleClose = () => {
		setOpen(false)
		if (name) setName('')
		if (type) setType(null)
		if (file) setFile(null)
		if (uploading) setUploading(false)
		// if (errorMsg) setErrorMsg(null)
		// if (successMsg) setSuccessMsg(null)
	}

	return (
		<>
			<div className="relative">
				<VerticalBarSmall />
				<button
					className="inline-flex items-center rounded border-2 border-[--arbor-black] px-3 py-1 font-semibold hover:border-[--arbor-gray-gray] hover:bg-gray-200 hover:text-[--arbor-gray] disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:text-gray-300"
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
							<div>
								<div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-[--arbor-red]">
									<HiOutlineCloudUpload aria-hidden="true" className="size-6 text-[--arbor-red]" />
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
										Upload an audio file
									</DialogTitle>
									<div className="mt-2">
										<p className="mb-2 text-sm text-gray-500">
											Add a new stem to collaborate on this project. Drag and drop or use the file browser to upload an
											audio file.{' '}
										</p>
										<p className="mb-2 text-sm text-gray-500">
											The file will be stored in a decentralized manner in IPFS. If you aren&apos;t familiar with IPFS,
											you can{' '}
											<a
												className="underline hover:text-[--arbor-pink]"
												href="https://docs.ipfs.tech/concepts/ipfs-solves/"
												target="_blank"
											>
												read about the benefits
											</a>{' '}
											of why it&apos;s the best way to store files.
										</p>
										<p className="mb-2 text-sm italic text-gray-500">
											Arbor supports only <code>.wav</code> formats that are less than <code>20MB</code> in size.
										</p>
									</div>
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
								<div className="mb-6">
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
								<div className="mb-6">
									<label htmlFor="type" className="mb-2 block text-sm font-semibold">
										File Upload
									</label>
									<div className="flex space-x-2">
										<LuFileAudio aria-hidden="true" className="pointer-events-none size-8 self-center text-gray-400" />
										<input
											id="file"
											name="file"
											type="file"
											accept="audio/wav"
											onChange={e => setFile(e.target?.files?.[0] ?? null)}
											placeholder="/sick-bass-drop.wav"
											className="w-full rounded-md border-2 border-gray-300"
											disabled={uploading}
											required
										/>
									</div>
									{!file && errorMsg && <p className="mt-1 text-sm text-red-600">File is required</p>}
								</div>
							</div>
							<div className="flex items-center justify-between space-x-2">
								<ButtonPrimary className="w-full" color="pink" disabled={uploading} onClick={handleUpload}>
									{uploading ? 'Uploading...' : 'Upload'}
								</ButtonPrimary>
								<ButtonSecondary className="w-full" onClick={handleClose}>
									Cancel
								</ButtonSecondary>
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
