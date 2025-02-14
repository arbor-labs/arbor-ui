'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { LuPause, LuPlay, LuSkipBack } from 'react-icons/lu'
import { RiStopLargeLine } from 'react-icons/ri'
import type WaveSurfer from 'wavesurfer.js'

import { usePinataFile } from '$/graphql/hooks/useGetCID'
import { useProjectDetails } from '$/graphql/hooks/useProjectDetails'
// import { useWeb3 } from '$/providers/Web3Provider'
import { formatAddress } from '$/utils/formatAddress'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { AddStemDialog } from './AddStemDialog'
import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'
import { ProjectTag } from './ProjectTag'
import { DetailsProp, StemPlayer } from './StemPlayer'

type Props = {
	id: string
}

export const VerticalBarSmall = () => (
	<span className="ml-[37px] block min-h-[32px] w-[2px] bg-[--arbor-black]" aria-hidden="true" />
)

export function ProjectDetails({ id }: Props) {
	// Stems
	const [uploadStemOpen, setUploadStemOpen] = useState<boolean>(false)
	const [files, setFiles] = useState<Map<string, Blob>>(new Map())
	const [mutedTracks, setMutedTracks] = useState<number[]>([])
	const [soloedTracks, setSoloedTracks] = useState<number[]>([])
	const [handleUnmuteAll, setHandleUnmuteAll] = useState<boolean>(false)
	// Play/Pause
	const [blobs, setBlobs] = useState<Blob[]>([])
	const [wsInstances, setWsInstances] = useState<WaveSurfer[]>([])
	const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false)
	// Minting
	const [minting, setMinting] = useState<boolean>(false)
	const [mintingOpen, setMintingOpen] = useState<boolean>(false)
	const [mintingMsg, setMintingMsg] = useState<string>('')
	// Notifications
	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [successMsg, setSuccessMsg] = useState<string>('')
	const [downloading, setDownloading] = useState<boolean>(false)
	const [downloadingMsg, setDownloadingMsg] = useState<string>('')
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')
	// Hooks
	// const { isConnected, connectedAccount, handleConnectDisconnect } = useWeb3()
	const { data, isLoading, isError, error } = useProjectDetails(id)
	// const {
	// 	data: pinataFile,
	// 	isError: isPinataError,
	// 	error: pinataError,
	// } = usePinataFile('bafybeiffqh4gqawzehdbvxcr5f7iyj4ztnuetumi4fqc2lfnsf5ygrbjz4')

	useEffect(() => {
		if (soloedTracks.length > 0 && soloedTracks.length === wsInstances.length) {
			setHandleUnmuteAll(unMuteAll => !unMuteAll)
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

	// useEffect(() => {
	// 	console.log({ wsInstances })
	// }, [wsInstances])

	// useEffect(() => {
	// 	const loadFileIntoWs = async (contentType: string, data: string) => {
	// 		console.log({ data })
	// 		const binaryData = Buffer.from(data, 'binary')
	// 		const blob = new Blob([binaryData], { type: contentType })
	// 		console.log({ blob })
	// 		setBlobs([...blobs, blob])
	// 		// wsInstances[0].loadBlob(blob)
	// 	}
	// 	if (pinataFile) {
	// 		const {
	// 			getFile: { contentType, data },
	// 		} = pinataFile
	// 		loadFileIntoWs(String(contentType), String(data))
	// 	}
	// }, [pinataFile])

	// if (isPinataError) {
	// 	console.error({ pinataError })
	// }

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
		const stems: DetailsProp[] = /* project.stems ?? */ [
			{
				id: '1',
				name: 'Drums',
				type: 'drums',
				filename: 'DRUMS.wav',
				createdBy: {
					address: '0xd997ebC236a9533fa7D8A9C81a62215Cb248763F',
				},
			},
			{
				id: '2',
				name: 'Rhythm Guitar',
				type: 'chords',
				filename: 'GTR - Rhythm.wav',
				createdBy: {
					address: '0xD6FfB3479F78876956880D1666299610eDd6DF56',
				},
			},
			{
				id: '3',
				name: 'Lead Guitar',
				type: 'melody',
				filename: 'GTR - Lead.wav',
				createdBy: {
					address: '0x5B4C6e68637618285d2792d2934dF552E23c62C2',
				},
			},
		]
		const collaborators = project.collaborators ?? []
		const limitReached = stems.length >= project.trackLimit

		// const handleMintAndBuy = () => {}
		const handleDownloadAll = () => {}

		/* Stem Upload handlers */

		// const onStemUploadSuccess = () => {
		// 	// Refresh UI
		// 	setSuccessOpen(true)
		// 	setSuccessMsg("Success! You've uploaded a new stem to the project stem queue.")
		// 	handleUploadStemClose()
		// 	// TODO: refetch new project data, switch to stems tab
		// }

		// const onNewFile = (filename: string, newFile: Blob) => {
		// 	setFiles(files => new Map(files.set(filename, newFile)))
		// }

		/*
			Wavesurfer handlers
		*/
		const onWavesInit = (idx: number, ws: WaveSurfer) => {
			setWsInstances([...wsInstances, ws])
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
		const handleSkipPrevAllTracks = () => wsInstances.forEach(ws => ws.seekTo(0))

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

		const onNotificationClose = () => {
			setSuccessOpen(false)
			setSuccessMsg('')
			setErrorOpen(false)
			setErrorMsg('')
			setDownloading(false)
			setDownloadingMsg('')
			setMintingOpen(false)
			setMintingMsg('')
		}

		return (
			<>
				{/* Project metadata */}
				<div className="relative flex items-center justify-start">
					<div className="mr-2 h-full w-24">
						<span
							className="absolute left-[38px] top-1 block h-full min-h-[300px] w-[4px] bg-[--arbor-black]"
							aria-hidden="true"
						/>
						<button
							className={`absolute top-1 size-20 rounded-xl bg-[--arbor-black] text-[--arbor-white] shadow-none hover:bg-[--arbor-gray] ${stems.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} place-items-center`}
							onClick={togglePlayPauseAllTracks}
							disabled={stems.length === 0}
							title={isPlayingAll ? 'Pause playback' : 'Play all stems simultaneously'}
						>
							{isPlayingAll ? <FaPause className="size-8" /> : <FaPlay className="size-8" />}
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
					<div className="mt-16 flex items-center justify-between rounded-t-lg bg-[--arbor-black] px-3 py-5 text-[--arbor-white]">
						<h3 className="text-2xl font-semibold uppercase italic">Song Stems</h3>
						<div className="flex grow items-center justify-center uppercase italic">
							<p>
								{stems.length} Stem{stems.length === 1 ? '' : 's'} from {collaborators.length} Collaborator
								{collaborators.length === 1 ? '' : 's'}
							</p>
							<div className="ml-2 flex space-x-2">
								{/* TODO: create a UserAvatar component */}
								{collaborators.map((c, idx) => (
									<a
										key={idx}
										href={`/users/${c}`}
										className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-pink-700 bg-pink-500 hover:bg-pink-600"
									>
										<span className="text-white">P</span>
									</a>
								))}
							</div>
						</div>
						<button
							className="font-bold uppercase italic text-[--arbor-white]"
							onClick={handleDownloadAll}
							disabled={stems.length !== files.size || stems.length === 0}
						>
							Export Stems
						</button>
					</div>

					{/* Global playback submenu */}
					<div className="flex items-center space-x-2 border-2 border-[--arbor-black] px-2 py-3">
						<button
							className="text-[--arbor-gray] hover:text-[--arbor-purple-hover]"
							onClick={handlePlayAllTracks}
							title={isPlayingAll ? 'Pause playback' : 'Play all stems simultaneously'}
						>
							{isPlayingAll ? <LuPause /> : <LuPlay />}
						</button>
						<button
							className="text-[--arbor-gray] hover:text-[--arbor-purple-hover]"
							onClick={handleStopAllTracks}
							title="Stop playback"
						>
							<RiStopLargeLine />
						</button>
						<button
							className="text-[--arbor-gray] hover:text-[--arbor-purple-hover]"
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
					stems.map((stem, idx) => (
						<div key={idx} className="relative">
							<VerticalBarSmall />
							<StemPlayer idx={idx} details={stem} onInit={onWavesInit} onMute={handleMute} onSolo={handleSolo} />
						</div>
					))
				) : (
					<p className="rounded-b-lg border-2 border-t-0 border-black px-2 py-3 text-center">
						No stems to show, upload one!
					</p>
				)}

				{/* Add stem button */}
				{!limitReached && <AddStemDialog projectId={project.id} />}

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
