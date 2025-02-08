import { useState } from 'react'
import { CgClose } from 'react-icons/cg'

type Props = {
	tags: string[]
	onAdd: (tag: string) => void
	onDelete: (tag: string) => void
}

export function TagsInput({ tags, onAdd, onDelete }: Props) {
	const [currTag, setCurrTag] = useState('')

	const handleKeyDown = (e: { keyCode: number }) => {
		const { keyCode } = e
		// Add on Enter, allow multi word tags
		if (keyCode === 13) {
			const trimmedTag = currTag.trim()
			// Only allow unique and non-empty tags
			if (trimmedTag && !tags.includes(trimmedTag)) onAdd(trimmedTag)
			setCurrTag('')
		}
	}

	return (
		<>
			<input
				type="text"
				className="w-full rounded border p-2"
				placeholder="Add multiple tags by hitting 'Enter' between each one"
				value={currTag}
				onKeyDown={handleKeyDown}
				onChange={e => setCurrTag(e.target.value)}
			/>
			{tags.length > 0 && (
				<div className="mt-2 flex flex-wrap">
					{tags.map(tag => (
						<div
							key={tag}
							className="m-1 flex items-center rounded-full bg-[--arbor-purple] px-3 py-1 text-[--arbor-white]"
						>
							<span>{tag}</span>
							<button className="ml-2 text-[--arbor-white] hover:text-gray-800" onClick={() => onDelete(tag)}>
								<CgClose />
							</button>
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default TagsInput
