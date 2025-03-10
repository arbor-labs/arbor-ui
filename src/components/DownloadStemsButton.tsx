'use client'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useState } from 'react'
import { LuDownload } from 'react-icons/lu'

import { type ProjectStemData } from '$/graphql/hooks/useProjectDetails'
import { getErrorMessage } from '$/utils/getErrorMessage'
import { get } from '$/utils/http'

import { ButtonOutline } from './Buttons'
import { Notification } from './Notification'

type Props = {
	stems: ProjectStemData[]
	projectName?: string
}

export function DownloadStemsButton({ stems, projectName }: Props) {
	const isMultiple = stems.length > 1
	const [downloading, setDownloading] = useState(false)
	const [downloadingMsg, setDownloadingMsg] = useState('')
	const [successOpen, setSuccessOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)

	const handleDownload = async () => {
		try {
			setDownloading(true)
			setDownloadingMsg(
				isMultiple ? 'Downloading project stem files from IPFS...' : 'Downloading stem file from IPFS...',
			)

			// Create zip and add files
			const zip = new JSZip()
			await Promise.all(
				stems.map(async stem => {
					const { data } = await get(`/pinata/file/${stem.audioCID}`)
					zip.file(stem.name + '.wav', data, { compression: 'STORE', binary: true })
				}),
			)

			// Generate and save zip
			const content = await zip.generateAsync({ type: 'blob' })
			setDownloadingMsg(
				isMultiple
					? 'Stems downloaded and compressed, please select a location to save them'
					: 'Stem downloaded, please select a location to save it',
			)
			const filename = isMultiple
				? `Arbor_${projectName}_${Date.now()}.zip`
				: `Arbor_${stems[0].name}_${Date.now()}.zip`
			saveAs(content, filename)

			setSuccessOpen(true)
		} catch (e) {
			console.error(getErrorMessage(e))
			setErrorOpen(true)
		} finally {
			setDownloading(false)
			setDownloadingMsg('')
		}
	}

	return (
		<>
			<ButtonOutline
				icon={<LuDownload className="mr-2 size-5" />}
				onClick={handleDownload}
				disabled={stems.length === 0 || downloading}
			>
				{isMultiple ? 'Download Stems' : 'Download'}
			</ButtonOutline>
			{downloading && (
				<Notification
					isOpen
					variant="info"
					title={isMultiple ? 'Exporting stems' : 'Exporting stem'}
					text={downloadingMsg}
				/>
			)}
			{successOpen && (
				<Notification isOpen variant="success" title="Downloading complete" text="Stem(s) downloaded successfully" />
			)}
			{errorOpen && (
				<Notification isOpen variant="error" title="Downloading failed" text="Something went wrong. Please try again" />
			)}
		</>
	)
}
