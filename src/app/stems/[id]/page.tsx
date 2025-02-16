import { StemDetails } from '$/components/StemDetails'

import { Page } from '../../../components/Page'

export default async function StemtDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<Page metaTitle="Stem Details" pageTitle="Stem Details">
			<StemDetails id={id} />
		</Page>
	)
}
