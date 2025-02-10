import { NoData } from '$/components/NoData'

import { Page } from '../../components/Page'

export default function ArboretumPage() {
	return (
		<Page metaTitle="Welcome to the Arboretum" pageTitle="Welcome to the Arboretum">
			<NoData resource="song" tagline="Mint an NFT of one of the projects." />
		</Page>
	)
}
