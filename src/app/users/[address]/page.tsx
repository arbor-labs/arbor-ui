import { Address } from 'viem'

import { UserDetails } from '$/components/UserDetails'

import { Page } from '../../../components/Page'

export default async function UserDetailsPage({ params }: { params: Promise<{ address: Address }> }) {
	const { address } = await params

	return (
		<Page metaTitle="User Details" pageTitle="User Details">
			<UserDetails address={address} />
		</Page>
	)
}
