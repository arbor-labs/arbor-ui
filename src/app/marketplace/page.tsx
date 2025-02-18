import { NoData } from '$/components/NoData'

import { Page } from '../../components/Page'

export default function ArboretumPage() {
	return (
		<Page
			metaTitle="Welcome to the Arboretum"
			pageTitle="Welcome to the Arboretum"
			subtext="Explore the artist arboretum for unique music and audio NFTs, buy, sell, and trade with others, all right here on the Arbor Audio platform."
		>
			<NoData resource="song" tagline="Mint an NFT of one of the projects." />
		</Page>
	)
}
