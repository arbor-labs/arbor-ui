'use client'

import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { LuCircleCheckBig, LuCircleX } from 'react-icons/lu'

type Props = {
	isOpen: boolean
	variant: 'success' | 'error' | 'warning' | 'info'
	title: string
	text?: string
	onClose?: () => void
}
export function Notification({ isOpen, variant, title, text, onClose }: Props) {
	const [show, setShow] = useState(isOpen)

	const handleClose = () => {
		setShow(false)
		if (onClose) onClose()
	}

	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
					<Transition show={show}>
						<div className="data-closed:opacity-0 data-enter:duration-1000 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-1000 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition">
							<div className="p-4">
								<div className="flex items-start">
									<div className="shrink-0">
										{variant === 'success' && (
											<LuCircleCheckBig aria-hidden="true" className="size-6 text-[--success]" />
										)}
										{variant === 'error' && <LuCircleX aria-hidden="true" className="size-6 text-[--error]" />}
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">{title}</p>
										{text && <p className="mt-1 text-sm text-gray-500">{text}</p>}
									</div>
									<div className="ml-4 flex shrink-0">
										<button
											type="button"
											onClick={handleClose}
											className="focus:outline-hidden inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											<span className="sr-only">Close</span>
											<CgClose aria-hidden="true" className="size-5" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}
