import { useWavesurfer } from '@wavesurfer/react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { LuSkipBack } from 'react-icons/lu'
import { RiStopLargeLine } from 'react-icons/ri'
import { Address } from 'viem'
import type WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'

import { PINATA_BASE_URL, STEM_COLORS } from '$/lib/constants'
import { formatAddress } from '$/utils/formatAddress'
import { formatStemName } from '$/utils/formatStem'

import { StemPlayerControl } from './Buttons'
import { StemTypeTag } from './StemTypeTag'

export interface DetailsProp {
	id: string
	name: string
	type: string
	filename: string
	audioCID: string
	createdBy: {
		address: Address
	}
}

type Props = {
	idx: number
	details?: DetailsProp
	isPreview?: boolean
	previewFile?: File
	isStemDetails?: boolean
	onInit: (idx: number, wavesurfer: WaveSurfer) => void
	onSolo?: (idx: number) => void
	onMute?: (idx: number) => void
	onSkipPrev?: () => void
	onStop?: (idx: number) => void
	onFinish?: (idx: number) => void
}

export function StemPlayer({
	idx,
	details,
	isPreview,
	previewFile,
	isStemDetails,
	onInit,
	onSolo,
	onMute,
	onSkipPrev,
	onStop,
	onFinish,
}: Props) {
	// Work with either an in-memory preview file or an external Pinata file
	const AUDIO_URL = isPreview && previewFile ? URL.createObjectURL(previewFile) : PINATA_BASE_URL + details?.audioCID

	// State
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [isSoloed, setIsSoloed] = useState<boolean>(false)

	// Hooks
	const containerRef = useRef(null)

	// WaveSurfer config - https://wavesurfer.xyz/examples/
	const wavesurferConfig = useMemo(
		() => ({
			url: AUDIO_URL,
			container: containerRef,
			waveColor: STEM_COLORS[details?.type ?? ''],
			progressColor: '#1e1e1e',
			cursorColor: '#000',
			cursorWidth: 1,
			height: 100,
			barWidth: 4,
			barGap: 1,
			barRadius: 2,
			plugins: [
				Hover.create({
					lineColor: 'var(--arbor-red)',
					lineWidth: 2,
					labelBackground: '#555',
					labelColor: '#fff',
					labelSize: '11px',
				}),
			],
		}),
		[details],
	)

	const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer(wavesurferConfig)

	// Callback to parent when file is loaded
	useEffect(() => {
		if (wavesurfer && isReady) {
			onInit(idx, wavesurfer)
			setIsLoading(false)
			// Set the onFinish callback
			if (onFinish) {
				wavesurfer.on('finish', () => {
					onFinish(idx)
				})
			}
		}
	}, [isReady])

	const togglePlayPause = () => {
		if (wavesurfer) wavesurfer.playPause()
	}

	const toggleMute = () => {
		if (onMute) {
			setIsMuted(!isMuted)
			setIsSoloed(false)
			onMute(idx)
		}
	}

	const toggleSolo = () => {
		if (onSolo) {
			setIsSoloed(!isSoloed)
			setIsMuted(false)
			onSolo(idx)
		}
	}

	return (
		<>
			<div className="rounded-lg border-2 border-[--arbor-black]">
				<div className="relative flex items-center bg-[--arbor-black] px-3 py-2 text-[--arbor-white]">
					{details && !isPreview && (
						<>
							<Link href={`/stems/${details.id}`} className="hover:text-[--arbor-pink]">
								<h4 className="mr-4 inline-block break-all text-2xl font-extrabold uppercase italic">
									{formatStemName(details.name || details.filename)}
								</h4>
							</Link>
							<div className="text-sm font-thin italic">
								Added {/* X hours ago */}by{' '}
								<Link
									href={`/users/${details.createdBy.address}`}
									className="ml-2 font-semibold text-[--arbor-gray-light] hover:text-[--arbor-pink]"
								>
									{formatAddress(details.createdBy.address)}
								</Link>
							</div>
							{!isStemDetails && <StemTypeTag type={details.type} className="absolute -top-3 right-4" />}
						</>
					)}
					{isPreview && (
						<div className="text-sm font-thin italic">
							<h4 className="mr-4 inline-block break-all text-2xl font-extrabold uppercase italic">
								New Audio Preview
							</h4>
						</div>
					)}
				</div>
				<div className="flex">
					<div className="flex items-center justify-start border-r-2 border-[--arbor-black] bg-gray-200 p-2 px-3">
						{!isStemDetails && !isPreview && (
							<button
								className="mr-2 flex size-14 items-center justify-center rounded-md bg-[--arbor-black] text-[--arbor-white] hover:bg-[--arbor-gray] disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:text-gray-300"
								onClick={togglePlayPause}
								disabled={isLoading}
							>
								{isPlaying ? <FaPause /> : <FaPlay />}
							</button>
						)}
						<div className={`flex flex-col`}>
							{isStemDetails || isPreview ? (
								<>
									{isPreview && (
										<StemPlayerControl onClick={togglePlayPause} title="Play" variant="secondary">
											{isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
										</StemPlayerControl>
									)}
									<StemPlayerControl
										onClick={onSkipPrev}
										title="Skip to beginning"
										variant="secondary"
										className="my-1"
									>
										<LuSkipBack size={16} />
									</StemPlayerControl>
									{!isPreview && (
										<StemPlayerControl onClick={() => onStop?.(idx)} title="Stop stem" variant="secondary">
											<RiStopLargeLine size={16} />
										</StemPlayerControl>
									)}
								</>
							) : (
								<>
									<StemPlayerControl
										onClick={toggleMute}
										title="Mute"
										disabled={isLoading}
										active={isMuted}
										className="mb-1"
									>
										M
									</StemPlayerControl>
									<StemPlayerControl onClick={toggleSolo} title="Solo" disabled={isLoading} active={isSoloed}>
										S
									</StemPlayerControl>
								</>
							)}
						</div>
					</div>
					<div className="flex-1 px-4 py-2">
						{isLoading && (
							<div className="h-[100px] w-full animate-pulse">
								<div className="flex size-full items-center justify-between">
									{[...Array(100)].map((_, i) => (
										<div
											key={i}
											className="h-2/5 w-1 rounded-sm bg-gray-400"
											style={{
												height: `${Math.random() * 100}%`,
											}}
										/>
									))}
								</div>
							</div>
						)}
						<div className={`${isLoading ? 'hidden' : ''}`} ref={containerRef} />
					</div>
				</div>
				{!isPreview && (
					<div className="rounded-b-lg border-t-2 border-[--arbor-black] bg-gray-200 px-2 py-1 font-normal text-gray-600">
						<div className="">
							Total Duration:{' '}
							<span className="inline-block font-thin text-gray-500">{wavesurfer?.getDuration() ?? ''}</span>
						</div>
						<div className="">
							Timestamp: <span className="inline-block font-thin text-gray-500">{currentTime}</span>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
