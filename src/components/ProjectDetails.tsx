'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { LuPause, LuPlay, LuSkipBack } from 'react-icons/lu'
import { RiStopLargeLine } from 'react-icons/ri'
import type WaveSurfer from 'wavesurfer.js'

import { ProjectStemData, useProjectDetails } from '$/graphql/hooks/useProjectDetails'
import { useWeb3 } from '$/providers/Web3Provider'
import { formatAddress } from '$/utils/formatAddress'
import { formatDate } from '$/utils/formatDate'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { AddStemDialog } from './AddStemDialog'
import { DownloadStemsButton } from './DownloadStemsButton'
import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'
import { ProjectCollaboratorsDialog } from './ProjectCollaboratorsDialog'
import { ProjectTag } from './ProjectTag'
import { StemPlayer } from './StemPlayer'

type Props = {
	id: string
}

type StemState = {
	playing: boolean
	muted: boolean
	soloed: boolean
	finished: boolean
}

export const VerticalBarSmall = () => (
	<span className="ml-[28px] block min-h-[32px] w-[4px] bg-[--arbor-black] sm:ml-[37px]" aria-hidden="true" />
)

export function ProjectDetails({ id }: Props) {
	// Stems
	const [stemState, setStemState] = useState<Map<number, StemState>>(new Map())
	// Wavesurfer
	const [wsInstances, setWsInstances] = useState<Map<number, WaveSurfer>>(new Map())
	const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false)
	const [mutedTracks, setMutedTracks] = useState<number[]>([])
	const [soloedTracks, setSoloedTracks] = useState<number[]>([])
	// Minting
	// const [minting, setMinting] = useState<boolean>(false)
	// const [mintingOpen, setMintingOpen] = useState<boolean>(false)
	// const [mintingMsg, setMintingMsg] = useState<string>('')
	// Notifications
	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [successMsg, setSuccessMsg] = useState<string>('')
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')
	// Hooks
	const { isConnected } = useWeb3()
	const { data, isLoading, isError, error, refetch } = useProjectDetails(id)

	useEffect(() => {
		if (soloedTracks.length > 0 && soloedTracks.length === wsInstances.size) {
			setSoloedTracks([])
			setMutedTracks([])
		}
		wsInstances.forEach((ws, idx) => {
			if (soloedTracks.includes(idx)) {
				ws.setMuted(false)
			} else if (soloedTracks.length > 0) {
				ws.setMuted(true)
			} else {
				ws.setMuted(mutedTracks.includes(idx))
			}
		})
	}, [soloedTracks, mutedTracks])

	// Reset back to initial state after all stems have finished playing
	useEffect(() => {
		if (stemState.size !== 0 && stemState.size === wsInstances.size) {
			const allStemsFinished = Array.from(stemState.values()).every(state => state.finished)
			if (allStemsFinished) {
				// Reset global playing state
				setIsPlayingAll(false)

				// Reset all individual stem states
				setStemState(prev => {
					const next = new Map(prev)
					for (const [idx, state] of next.entries()) {
						next.set(idx, {
							...state,
							playing: false,
							finished: false,
						})
					}
					return next
				})
			}
		}
	}, [stemState])

	if (isLoading)
		return (
			<div className="flex place-content-center">
				<LoadingSpinner />
			</div>
		)

	if (isError) {
		return (
			<>
				<ErrorMessage message="This project may not exist, or the server may be down. Please try again." />
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
		const tags = project.tags
		const collaborators = project.collaborators ?? []
		const stems = project.stems ?? []
		const limitReached = stems.length >= project.trackLimit

		/*
			Wavesurfer handlers
		*/
		const onWavesInit = (idx: number, ws: WaveSurfer) => {
			setWsInstances(prev => new Map(prev).set(idx, ws))
			setStemState(prev => new Map(prev).set(idx, { playing: false, muted: false, soloed: false, finished: false }))
		}

		// Play or pause each stem audio from wavesurfer
		const togglePlayPauseAllTracks = () => {
			wsInstances.forEach(ws => ws.playPause())
			setIsPlayingAll(!isPlayingAll)
		}

		// Stop playing all tracks
		const handleStopAllTracks = () => {
			wsInstances.forEach(ws => ws.stop())
			setIsPlayingAll(false)
		}
		// Bring all tracks back to beginning
		const handleSkipPrevAllTracks = () =>
			wsInstances.forEach(ws => {
				ws.seekTo(0)
				ws.setTime(0)
			})

		// Play all tracks
		const handlePlayAllTracks = () => wsInstances.forEach(ws => ws.play())

		// Solo a single track callback
		const handleSolo = (idx: number) => {
			if (soloedTracks.includes(idx)) {
				setSoloedTracks(soloedTracks.filter(i => i !== idx))
				setMutedTracks(mutedTracks.filter(i => i !== idx))
			} else {
				setSoloedTracks([...soloedTracks, idx])
				setMutedTracks(mutedTracks.filter(i => i !== idx))
			}
		}

		// Mute a single track callback
		const handleMute = (idx: number) => {
			if (mutedTracks.includes(idx)) {
				setMutedTracks(mutedTracks.filter(i => i !== idx))
				setSoloedTracks(soloedTracks.filter(i => i !== idx))
			} else {
				setMutedTracks([...mutedTracks, idx])
				setSoloedTracks(soloedTracks.filter(i => i !== idx))
			}
		}

		// Mark the stem as finished
		const handleFinish = (idx: number) => {
			setStemState(prev => {
				const next = new Map(prev)
				const state = next.get(idx)
				if (state) {
					next.set(idx, { ...state, finished: true, playing: false })
				}
				return next
			})
			wsInstances.get(idx)?.setTime(0)
			wsInstances.get(idx)?.seekTo(0)
			wsInstances.get(idx)?.play()
		}

		const onNotificationClose = () => {
			setSuccessOpen(false)
			setSuccessMsg('')
			setErrorOpen(false)
			setErrorMsg('')
			// setMintingOpen(false)
			// setMintingMsg('')
		}

		return (
			<>
				{/* Project metadata */}
				<div className="relative flex items-center justify-start pb-16">
					<div className="mr-6 h-full w-24 sm:mr-4">
						<span
							className="absolute left-[28px] top-1 -z-10 block h-full w-[4px] bg-[--arbor-black] sm:left-[38px]"
							aria-hidden="true"
						/>
						<button
							className={`absolute top-1 size-16 rounded-xl bg-[--arbor-black] text-[--arbor-white] shadow-none hover:bg-[--arbor-gray] sm:size-20 ${stems.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} place-items-center`}
							onClick={togglePlayPauseAllTracks}
							disabled={stems.length === 0}
							title={isPlayingAll ? 'Pause playback' : 'Play all stems simultaneously'}
						>
							{isPlayingAll ? <FaPause className="size-6 sm:size-8" /> : <FaPlay className="size-6 sm:size-8" />}
						</button>
					</div>
					<div className="grow">
						<div>
							<p className="font-light uppercase italic text-gray-700">
								Created by{' '}
								<Link href={`/users/${project.createdBy.address}`} className="hover:text-[--arbor-pink]">
									{formatAddress(project.createdBy.address)}
								</Link>
							</p>
							<h2 className="mb-4 text-5xl font-bold">{project.name}</h2>
						</div>
						<div className="mb-1">
							<p className="mr-5 inline-block">
								<span className="mr-1 inline-block font-semibold text-[--arbor-gray]">Created On</span>
								{formatDate(project.createdAt)}
							</p>
							<p className="mr-5 inline-block">
								<span className="mr-1 inline-block font-semibold text-[--arbor-gray]">Last Updated</span>
								{formatDate(project.updatedAt)}
							</p>
						</div>
						<div className="mb-4">
							<p className="mr-5 inline-block">
								<span className="mr-1 inline-block font-semibold text-[--arbor-gray]">BPM</span>
								{project.bpm}
							</p>
							<p className="mr-5 inline-block">
								<span className="mr-1 inline-block font-semibold text-[--arbor-gray]">Track Limit</span>
								{project.trackLimit} Tracks
								{limitReached && (
									<span className="-mt-1 ml-2 inline-block rounded-full border-2 border-[--arbor-black] bg-[--arbor-black] px-2 align-middle text-[.7rem] font-bold uppercase text-[--arbor-white]">
										Limit Reached!
									</span>
								)}
							</p>
							<p className="mr-5 inline-block">
								<span className="mr-1 inline-block font-semibold text-[--arbor-gray]">Open To</span>
								Anyone
							</p>
						</div>
						<p className="mb-2 text-lg font-light text-gray-500">{project.description}</p>
						{tags.map((tag: string) => (
							<ProjectTag key={tag} tag={tag} />
						))}
						<hr className="my-3 border-[--arbor-gray-light]" />

						{/* User actions section */}
						<div className="flex max-w-[200px] flex-col space-y-2 sm:max-w-full sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
							<ProjectCollaboratorsDialog collaborators={collaborators} stems={stems} disabled={stems.length === 0} />
							<DownloadStemsButton stems={stems} projectName={project.name} />
						</div>

						{/* {stems.length > 0 && (
							<div className="mt-3 flex flex-row items-center">
								<button
									className={`w-56 text-2xl font-bold italic tracking-wide text-black ${minting || stems.length < 2 ? 'pointer-events-none cursor-not-allowed' : ''}`}
									onClick={isConnected ? handleMintAndBuy : handleConnectDisconnect}
									disabled={minting || stems.length < 2}
								>
									{minting ? 'Minting...' : 'Mint & Buy'}
								</button>
								<div className="flex items-center pl-3">
									<p className="ml-1 text-2xl">
										0.01 <span className="text-sm text-gray-400">ETH</span>
									</p>
								</div>
							</div>
						)} */}
					</div>
				</div>

				{/* Global stems header */}
				<div className="relative">
					<div className="flex items-center justify-between rounded-t-lg bg-[--arbor-black] p-5 text-[--arbor-white]">
						<h3 className="mr-4 text-2xl font-semibold uppercase italic">Song Stems</h3>
						<div className="flex grow items-center justify-between uppercase italic">
							<p>
								{stems.length} Stem{stems.length === 1 ? '' : 's'} from {collaborators.length} Collaborator
								{collaborators.length === 1 ? '' : 's'}
							</p>
						</div>
					</div>

					{/* Global playback submenu */}
					<div className="flex items-center space-x-2 rounded-b-lg border-2 border-[--arbor-black] bg-white p-4">
						<button
							className="text-[--arbor-gray] hover:text-[--arbor-pink]"
							onClick={handlePlayAllTracks}
							title={isPlayingAll ? 'Pause playback' : 'Play all stems simultaneously'}
						>
							{isPlayingAll ? <LuPause /> : <LuPlay />}
						</button>
						<button
							className="text-[--arbor-gray] hover:text-[--arbor-pink]"
							onClick={handleStopAllTracks}
							title="Stop playback"
						>
							<RiStopLargeLine />
						</button>
						<button
							className="text-[--arbor-gray] hover:text-[--arbor-pink]"
							onClick={handleSkipPrevAllTracks}
							title="Skip to beginning"
						>
							<LuSkipBack />
						</button>
						{/* TODO: Full combined player */}
						<div className="grow">
							<div className="h-4 w-full bg-gray-300" />
						</div>
					</div>
				</div>

				{/* Stem players */}
				{stems.length > 0 ? (
					stems.map((stem: ProjectStemData, idx: number) => (
						<div key={idx} className="relative">
							<VerticalBarSmall />
							<StemPlayer
								idx={idx}
								details={stem}
								onInit={onWavesInit}
								onMute={handleMute}
								onSolo={handleSolo}
								onFinish={handleFinish}
							/>
						</div>
					))
				) : (
					<p className="rounded-b-lg border-2 border-t-0 border-black px-2 py-3 text-center">
						No stems to show, upload one!
					</p>
				)}

				{/* Add stem button */}
				{!limitReached && (
					<AddStemDialog projectId={project.id} disabled={!isConnected || limitReached} onSuccess={refetch} />
				)}

				{/* Notifications */}
				{successOpen && (
					<Notification isOpen variant="success" title="Success!" text={successMsg} onClose={onNotificationClose} />
				)}
				{errorOpen && (
					<Notification
						isOpen
						variant="error"
						title="An error occurred"
						text={errorMsg}
						onClose={onNotificationClose}
					/>
				)}
			</>
		)
	}
}
