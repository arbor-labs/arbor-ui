import { NoData } from '$/components/NoData'

import { Page } from '../../components/Page'

export default function StemsPage() {
	return (
		<Page metaTitle="Arbor Stems" pageTitle="Arbor Stems">
			<NoData resource="stem" tagline="Get started by contributing stems to a project." />
		</Page>
	)
}
