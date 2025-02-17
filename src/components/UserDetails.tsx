'use client'

import { Address } from 'viem'

import { useUserDetails } from '$/graphql/hooks/useUserDetails'
import { getErrorMessage } from '$/utils/getErrorMessage'

import { ErrorMessage } from './ErrorMessage'
import { LoadingSpinner } from './LoadingSpinner'
import { Notification } from './Notification'

type Props = {
	address: Address
}

export function UserDetails({ address }: Props) {
	const { data, isLoading, isError, error } = useUserDetails(address)

	if (isLoading)
		return (
			<div className="flex place-content-center">
				<LoadingSpinner />
			</div>
		)

	if (isError) {
		return (
			<>
				<ErrorMessage message="This user may not exist, or the server may be down. Please try again." />
				<Notification
					isOpen
					variant="error"
					title="An error occurred getting the user details"
					text={getErrorMessage(error)}
				/>
			</>
		)
	}

	if (data) {
		console.log(data.account)
		return <div>data found</div>
	}
}
