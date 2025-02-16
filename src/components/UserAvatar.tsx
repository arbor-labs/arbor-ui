import Image from 'next/image'
import { PiTreeDuotone } from 'react-icons/pi'

type AvatarSize = 'sm' | 'md' | 'lg'

const AVATAR_SIZES: Record<AvatarSize, number> = {
	sm: 24,
	md: 32,
	lg: 40,
}

type Props = {
	avatarUri: string | null
	size?: AvatarSize
	className?: string
}

export function UserAvatar({ avatarUri, size = 'sm', className = '' }: Props) {
	const pixelSize = AVATAR_SIZES[size]
	const baseClassName = 'rounded-full border-2 border-[--arbor-white] hover:opacity-85'

	return avatarUri ? (
		<Image
			src={avatarUri}
			alt="Avatar"
			width={pixelSize}
			height={pixelSize}
			className={`${baseClassName} ${className}`}
		/>
	) : (
		<div
			className={`size-${pixelSize} flex items-center justify-center border-none bg-gray-500 text-[--arbor-white] ${baseClassName} ${className} `}
		>
			<PiTreeDuotone className={`size-full p-2`} />
		</div>
	)
}
