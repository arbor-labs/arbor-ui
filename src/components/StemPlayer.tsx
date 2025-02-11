import { useWavesurfer } from '@wavesurfer/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { LuSkipBack } from 'react-icons/lu'
import { RiStopLargeLine } from 'react-icons/ri'
import { Address } from 'viem'
import type WaveSurfer from 'wavesurfer.js'

// import { STEM_COLORS } from '$/lib/constants'
import { formatAddress } from '$/utils/formatAddress'
import { formatStemName } from '$/utils/formatStem'

export type DetailsProp = {
	id: string
	name: string
	type: string
	filename: string
	createdBy: {
		address: Address
	}
	url: string
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
	onFinish,
	onNewFile,
}: Props) {
	// State
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [isSoloed, setIsSoloed] = useState<boolean>(false)

	// Hooks
	const containerRef = useRef(null)
	const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
		container: containerRef,
		url: details.url,
		waveColor: '#e74b7a',
		progressColor: '#87a1ca',
		height: 80,
		/**
		 * Render a waveform as a squiggly line
		 * @see https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
		 */
		// renderFunction: (channels, ctx) => {
		// 	const { width, height } = ctx.canvas
		// 	const scale = channels[0].length / width
		// 	const step = 10

		// 	ctx.translate(0, height / 2)
		// 	ctx.strokeStyle = ctx.fillStyle
		// 	ctx.beginPath()

		// 	for (let i = 0; i < width; i += step * 2) {
		// 		const index = Math.floor(i * scale)
		// 		const value = Math.abs(channels[0][index])
		// 		let x = i
		// 		let y = value * height

		// 		ctx.moveTo(x, 0)
		// 		ctx.lineTo(x, y)
		// 		ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true)
		// 		ctx.lineTo(x + step, 0)

		// 		x = x + step
		// 		y = -y
		// 		ctx.moveTo(x, 0)
		// 		ctx.lineTo(x, y)
		// 		ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false)
		// 		ctx.lineTo(x + step, 0)
		// 	}

		// 	ctx.stroke()
		// 	ctx.closePath()
		// },
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
					<div className="absolute -top-3 right-4 rounded-md bg-[--arbor-pink] px-1.5 py-1 text-xs font-bold uppercase text-[--arbor-white]">
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
					Timestamp: <span className="inline-block font-thin text-gray-500">{currentTime}</span>
				</div>
			</div>
		</>
	)
}
