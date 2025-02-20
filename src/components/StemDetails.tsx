'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import WaveSurfer from 'wavesurfer.js'

import { useStemDetails } from '$/graphql/hooks/useStemDetails'
import { PINATA_BASE_URL } from '$/lib/constants'
import { formatAddress } from '$/utils/formatAddress'
import { formatBytes } from '$/utils/formatBytes'
import { formatDate } from '$/utils/formatDate'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { DownloadStemsButton } from './DownloadStemsButton'
import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'
import { StemPlayer } from './StemPlayer'
import { StemTypeTag } from './StemTypeTag'

type Props = {
	id: string
}

export function StemDetails({ id }: Props) {
	// State
	const [ws, setWs] = useState<WaveSurfer>()
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

	// Hooks
	const { data, isLoading, isError, error } = useStemDetails(id)

	if (isLoading)
		return (
			<div className="flex place-content-center">
				<LoadingSpinner />
			</div>
		)

	if (isError) {
		return (
			<>
				<ErrorMessage message="This stem may not exist, or the server may be down. Please try again." />
				<Notification
					isOpen
					variant="error"
					title="An error occurred getting the stem details"
					text={getErrorMessage(error)}
				/>
			</>
		)
	}

	if (data) {
		const { stem } = data

		const onWavesInit = (_idx: number, wavesurfer: WaveSurfer) => {
			setWs(wavesurfer)
		}

		const handlePlayPause = () => {
			if (ws) {
				ws.playPause()
				setIsPlaying(!isPlaying)
			}
		}

		const handleFinish = (_idx: number) => {
			setIsPlaying(false)
		}

		const handleStop = (_idx: number) => {
			if (ws) {
				ws.stop()
				ws.seekTo(0)
				setIsPlaying(false)
			}
		}

		const handleSkipPrev = () => {
			if (ws) {
				ws.seekTo(0)
				ws.setTime(0)
			}
		}

		return (
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header section */}
				<div className="relative flex items-center justify-start pb-8">
					<div className="mr-6 h-full w-24 sm:mr-4">
						<span className="absolute left-[38px] top-1 block h-full w-[4px] bg-[--arbor-black]" aria-hidden="true" />
						<button
							className="absolute top-1 size-20 cursor-pointer place-items-center rounded-xl bg-[--arbor-black] text-[--arbor-white] shadow-none hover:bg-[--arbor-gray]"
							onClick={handlePlayPause}
						>
							{isPlaying ? <FaPause className="size-8" /> : <FaPlay className="size-8" />}
						</button>
					</div>

					{/* Metadata */}
					<div className="grow">
						<div>
							<p className="font-light uppercase italic text-gray-700">
								Created by{' '}
								<Link href={`/users/${stem.createdBy.address}`} className="hover:text-[--arbor-pink]">
									{formatAddress(stem.createdBy.address)}
								</Link>
							</p>
							<div className="mb-4 flex items-center space-x-4">
								<h2 className="text-5xl font-bold">{stem.name}</h2>
								<StemTypeTag type={stem.type} className="mt-1" />
							</div>
						</div>
						<div className="grid max-w-[600px] grid-cols-1 gap-x-4 text-lg font-light text-gray-500 sm:grid-cols-2">
							<div className="">
								<p>
									<span className="font-medium text-gray-700">Created:</span> {formatDate(stem.createdAt)}
								</p>
								<p>
									<span className="font-medium text-gray-700">File Size:</span> {formatBytes(stem.filesize)}
								</p>
								<p>
									<span className="font-medium text-gray-700">File Type:</span> {stem.filetype}
								</p>
							</div>
							<div className="">
								<p>
									<span className="font-medium text-gray-700">Metadata File:</span>{' '}
									<Link
										href={`${PINATA_BASE_URL}${stem.metadataCID}`}
										target="_blank"
										className="underline hover:text-[--arbor-pink]"
									>
										View on IPFS
									</Link>
								</p>
								<p>
									<span className="font-medium text-gray-700">Audio File:</span>{' '}
									<Link
										href={`${PINATA_BASE_URL}${stem.audioCID}`}
										target="_blank"
										className="underline hover:text-[--arbor-pink]"
									>
										View on IPFS
									</Link>
								</p>
								<div>
									<span className="font-medium text-gray-700">Projects Added To:</span>{' '}
									{stem.projectsAddedTo.map((project, idx) => (
										<span key={project.id}>
											{idx > 0 && ', '}
											<Link href={`/projects/${project.id}`} className="underline hover:text-[--arbor-pink]">
												{project.name}
											</Link>
										</span>
									))}
								</div>
							</div>
						</div>
						<hr className="my-3 border-[--arbor-gray-light]" />
						<DownloadStemsButton stems={[stem]} />
					</div>
				</div>

				{/* Stem Player */}

				<StemPlayer
					idx={0}
					details={stem}
					onInit={onWavesInit}
					onStop={handleStop}
					onSkipPrev={handleSkipPrev}
					onFinish={handleFinish}
					isStemDetails
				/>
			</div>
		)
	}
}
