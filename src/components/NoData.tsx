import Link from 'next/link'
import { TiPlus } from 'react-icons/ti'

type Props = {
	resource: string
	tagline: string
}

export function NoData({ resource, tagline }: Props) {
	return (
		<div className="text-center">
			<svg
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="mx-auto size-12 text-gray-400"
			>
				<path
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					strokeWidth={2}
					vectorEffect="non-scaling-stroke"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<h3 className="mt-2 text-sm font-semibold text-gray-900">{`No ${resource}s`}</h3>
			<p className="mt-1 text-sm text-gray-500">{tagline}</p>
			<div className="mt-6">
				<Link href="/projects/create">
					<button
						type="button"
						className="shadow-xs inline-flex items-center rounded-md bg-[--arbor-pink] px-3 py-2 text-sm font-semibold text-[--arbor-white] hover:bg-[--arbor-pink-hover] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--arbor-pink-hover]"
					>
						<TiPlus aria-hidden="true" className="-ml-0.5 mr-1.5 size-4" />
						New {resource}
					</button>
				</Link>
			</div>
		</div>
	)
}
