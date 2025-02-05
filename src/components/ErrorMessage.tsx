type Props = {
	statusCode: number
	message: string
}

export function ErrorMessage({ statusCode, message }: Props) {
	return (
		<div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-xl font-semibold text-[--arbor-purple]">{statusCode}</p>
				<h1 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-[--arbor-gray] sm:text-3xl">
					Something went wrong
				</h1>
				<p className="mt-6 text-pretty text-lg font-medium text-[--arbor-gray]">{message}</p>
			</div>
		</div>
	)
}
