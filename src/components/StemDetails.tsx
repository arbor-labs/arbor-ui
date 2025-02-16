'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import WaveSurfer from 'wavesurfer.js'

import { useStemDetails } from '$/graphql/hooks/useStemDetails'
import { PINATA_BASE_URL, STEM_COLORS } from '$/lib/constants'
import { formatAddress } from '$/utils/formatAddress'
import { formatBytes } from '$/utils/formatBytes'
import { formatDate } from '$/utils/formatDate'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'
import { StemPlayer } from './StemPlayer'

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
				<div className="relative flex items-center justify-start">
					<div className="mr-2 h-full w-24">
						<span
							className="absolute left-[38px] top-1 block h-full min-h-[300px] w-[4px] bg-[--arbor-black]"
							aria-hidden="true"
						/>
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
								<div
									className="rounded-md border-2 border-[--arbor-black] px-2 py-1 text-sm font-bold uppercase text-[--arbor-white] [text-shadow:_1.5px_1.5px_0px_rgba(0,0,0,1)]"
									style={{ backgroundColor: STEM_COLORS[stem.type] }}
								>
									{stem.type}
								</div>
							</div>
						</div>
						<div className="mb-4 space-y-2 text-lg font-light text-gray-500">
							<p>
								<span className="font-medium text-gray-700">File Type:</span> {stem.filetype}
							</p>
							<p>
								<span className="font-medium text-gray-700">File Size:</span> {formatBytes(stem.filesize)}
							</p>
							<p>
								<span className="font-medium text-gray-700">Created:</span> {formatDate(String(stem.createdAt))}
							</p>
							<p>
								<span className="font-medium text-gray-700">Audio File:</span>{' '}
								<Link href={`${PINATA_BASE_URL}${stem.audioCID}`} target="_blank" className="hover:text-[--arbor-pink]">
									View on IPFS
								</Link>
							</p>
							<div>
								<span className="font-medium text-gray-700">Projects Added To:</span>{' '}
								{stem.projectsAddedTo.map((project, idx) => (
									<span key={project.id}>
										{idx > 0 && ', '}
										<Link href={`/projects/${project.id}`} className="hover:text-[--arbor-pink]">
											{project.name}
										</Link>
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Stem Player */}
				<div className="mt-8">
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
			</div>
		)
	}
}
