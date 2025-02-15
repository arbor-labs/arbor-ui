import { useWavesurfer } from '@wavesurfer/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { LuSkipBack } from 'react-icons/lu'
import { RiStopLargeLine } from 'react-icons/ri'
import { Address } from 'viem'
import type WaveSurfer from 'wavesurfer.js'

import { PINATA_BASE_URL, STEM_COLORS } from '$/lib/constants'
import { formatAddress } from '$/utils/formatAddress'
import { formatStemName } from '$/utils/formatStem'

export interface DetailsProp {
	id: string
	name: string
	type: string
	filename: string
	audioCID: unknown // for some reason gql-tada is not converting this to a string
	createdBy: {
		address: Address
	}
}

type Props = {
	idx: number
	details: DetailsProp
	isStemDetails?: boolean
	isQueued?: boolean
	onInit: (idx: number, ws: WaveSurfer) => void
	onPlay?: (idx: number) => void
	onSolo?: (idx: number) => void
	onMute?: (idx: number) => void
	onSkipPrev?: () => void
	onStop?: (idx: number) => void
	onFinish?: (idx: number, ws: WaveSurfer) => void
	onNewFile?: (newFileName: string, newFile: Blob) => void
}

export function StemPlayer({
	idx,
	details,
	isStemDetails,
	isQueued,
	onInit,
	onPlay,
	onSolo,
	onMute,
	onSkipPrev,
	onStop,
}: Props) {
	// State
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [isSoloed, setIsSoloed] = useState<boolean>(false)

	// Hooks
	const containerRef = useRef(null)

	// WaveSurfer config - https://wavesurfer.xyz/examples/
	const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
		url: PINATA_BASE_URL + details.audioCID,
		container: containerRef,
		waveColor: STEM_COLORS[details.type],
		progressColor: '#',
		height: 100,
		barWidth: 4,
		barGap: 1,
		barRadius: 2,
	})

	// Callback to parent when file is loaded
	useEffect(() => {
		if (wavesurfer && isReady) onInit(idx, wavesurfer)
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
			<div className="rounded-t-lg border-2 border-[--arbor-black]">
				<div className="relative flex items-center bg-[--arbor-black] px-3 py-2 text-[--arbor-white]">
					<h4 className="mr-4 inline-block break-all text-2xl font-extrabold uppercase italic">
						{formatStemName(details.name || details.filename)}
					</h4>
					<div className="text-sm font-thin italic">
						Added {/* X hours ago */}by{' '}
						<Link
							href={`/users/${details.createdBy.address}`}
							className="ml-2 font-semibold text-[--arbor-gray-light] hover:text-[--arbor-pink]"
						>
							{formatAddress(details.createdBy.address)}
						</Link>
					</div>
					<div
						className="absolute -top-3 right-4 rounded-md border-2 border-[--arbor-black] px-1.5 py-1 text-xs font-bold uppercase text-[--arbor-white] [text-shadow:_1.5px_1.5px_0px_rgba(0,0,0,1)]"
						style={{ backgroundColor: STEM_COLORS[details.type] }}
					>
						{details.type}
					</div>
				</div>
				<div className="flex">
					<div className="flex items-center justify-start border-r-2 border-[--arbor-black] bg-gray-200 p-2 px-3">
						<button
							className="mr-2 flex size-14 items-center justify-center rounded-md bg-[--arbor-black] text-[--arbor-white]"
							onClick={togglePlayPause}
						>
							{isPlaying ? <FaPause /> : <FaPlay />}
						</button>
						<div className={`flex flex-col`}>
							{isStemDetails || isQueued ? (
								<>
									{isQueued && (
										<button onClick={() => (onPlay ? onPlay(idx) : null)} title="Play stem">
											<FaPlay />
										</button>
									)}
									{isStemDetails && (
										<button onClick={() => (onSkipPrev ? onSkipPrev() : null)} title="Skip to beginning">
											<LuSkipBack />
										</button>
									)}
									<button onClick={() => (onStop ? onStop(idx) : null)} title="Stop stem">
										<RiStopLargeLine />
									</button>
								</>
							) : (
								<>
									<button
										className={`mb-1 rounded-md border-2 border-[--arbor-black] px-1.5 py-0.5 text-xs font-semibold text-[--arbor-white] ${isMuted ? 'bg-[--arbor-gray]' : 'bg-[--arbor-gray-light]'}`}
										onClick={toggleMute}
										title="Mute"
									>
										M
									</button>
									<button
										className={`rounded-md border-2 border-[--arbor-black] px-1.5 py-0.5 text-xs font-semibold text-[--arbor-white] ${isSoloed ? 'bg-[--arbor-gray]' : 'bg-[--arbor-gray-light]'}`}
										onClick={toggleSolo}
										title="Solo"
									>
										S
									</button>
								</>
							)}
						</div>
					</div>
					<div className="flex-1 px-4 py-2">
						<div ref={containerRef} />
					</div>
				</div>
				<div className="border-t-2 border-[--arbor-black] bg-gray-200 px-2 py-1 font-normal text-gray-600">
					<div className="">
						Total Duration:{' '}
						<span className="inline-block font-thin text-gray-500">{wavesurfer?.getDuration() ?? ''}</span>
					</div>
					<div className="">
						Timestamp: <span className="inline-block font-thin text-gray-500">{currentTime}</span>
					</div>
				</div>
			</div>
		</>
	)
}
