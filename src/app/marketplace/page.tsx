import { NoData } from '$/components/NoData'

import { Page } from '../../components/Page'

export default function ArboretumPage() {
	return (
		<Page
			metaTitle="Welcome to the Arboretum"
			pageTitle="Welcome to the Arboretum"
			subtext="Mint an NFT of one of the projects."
		>
			<NoData resource="song" tagline="Mint an NFT of one of the projects." />
		</Page>
	)
}
