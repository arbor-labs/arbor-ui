import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { TbArrowBigDownLines, TbMusic } from 'react-icons/tb'

import { ButtonPrimary } from '../components/Buttons'
import { Faq } from '../components/Faq'

// import RecentProjectActivity from '../components/RecentProjectActivity'

const RecentProjectActivity = () => <></>

export default function HomePage() {
	const ArtistBlocks: React.FC = () => (
		<>
			<div className="m-2 flex items-center justify-center border-2 border-[--arbor-black] bg-[--arbor-pink] p-4 font-bold">
				Alice&apos;s Drums
			</div>
			<div className="m-2 flex items-center justify-center border-2 border-[--arbor-black] bg-[--arbor-peach] p-4 font-bold">
				Bob&apos;s Bass
			</div>
			<div className="m-2 flex items-center justify-center border-2 border-[--arbor-black] bg-[--arbor-light-purple] p-4 font-bold">
				Charlie&apos;s Melody
			</div>
			<div className="m-2 flex items-center justify-center border-2 border-[--arbor-black] bg-[--arbor-purple] p-4 font-bold">
				Dave&apos;s Chords
			</div>
		</>
	)
	return (
		<>
			<Head>
				<title>Arbor | A Generative Music NFT Platform</title>
			</Head>
			<section className="relative bg-[#1B2021] bg-[url('/arbor_6x6_logo.svg')] bg-contain bg-[90%] bg-no-repeat px-10 py-24">
				<div className="container mx-auto max-w-screen-xl">
					<div className="-ml-10 inline-block rounded-r-3xl bg-[rgba(0,0,0,0.5)] p-10 text-[--arbor-white]">
						<h2 className="mb-5 text-3xl font-medium md:text-5xl">
							Create Together,
							<br />
							Earn Together.
						</h2>
						<ul>
							<li className="mb-1 flex items-center">
								<TbMusic />
								<p className="ml-2 text-xl">Co-create songs with anyone</p>
							</li>
							<li className="mb-1 flex items-center">
								<TbMusic />
								<p className="ml-2 text-xl">Use the DAW you already love</p>
							</li>
							<li className="mb-1 flex items-center">
								<TbMusic />
								<p className="ml-2 text-xl">Collectors buy songs as NFTs</p>
							</li>
							<li className="mb-1 flex items-center">
								<TbMusic />
								<p className="ml-2 text-xl">
									The artists earn <span className="underline">all</span> proceeds.
								</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<RecentProjectActivity />
			<section className="px-10 py-24 text-center">
				<div className="container mx-auto max-w-screen-xl">
					<h2 className="mb-5 text-3xl md:text-4xl">How It Works</h2>
					<p className="mb-7 text-xl md:mb-10 md:text-2xl">
						Songs are created publicly via stems and sold as NFTs. Proceeds are split equally among artists.
					</p>
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
						<div>
							<h6 className="text-lg">1&#41; Someone Starts a Project</h6>
							<div className="m-2 border-4 border-[--arbor-black] bg-gray-100 p-4">
								<div className="m-2 border-2 border-[--arbor-black] bg-white p-7"></div>
								<div className="m-2 border-2 border-[--arbor-black] bg-white p-7"></div>
								<div className="m-2 border-2 border-[--arbor-black] bg-white p-7"></div>
								<div className="m-2 border-2 border-[--arbor-black] bg-white p-7"></div>
								<div className="my-4 flex justify-center text-2xl">
									<TbArrowBigDownLines />
								</div>
								<div className="m-2 flex min-h-20 items-center justify-center border-2 border-[--arbor-black] bg-white p-4 text-lg font-bold"></div>
							</div>
						</div>
						<div>
							<h6 className="text-lg">2&#41; Artists Add Stems</h6>
							<div className="m-2 border-4 border-[--arbor-black] bg-gray-100 p-4">
								<ArtistBlocks />
								<div className="my-4 flex justify-center text-2xl">
									<TbArrowBigDownLines />
								</div>
								<div className="m-2 flex min-h-20 items-center justify-center border-2 border-[--arbor-black] bg-white p-4 text-lg font-bold"></div>
							</div>
						</div>
						<div>
							<h6 className="text-lg">3&#41; Collectors Mint &amp; Buy Songs</h6>
							<div className="m-2 border-4 border-[--arbor-black] bg-gray-100 p-4">
								<ArtistBlocks />
								<div className="my-4 flex justify-center text-2xl">
									<TbArrowBigDownLines />
								</div>
								<div className="bg-multi m-2 flex min-h-20 items-center justify-center border-2 border-[--arbor-black] p-4 text-lg font-bold">
									SOLD FOR 1 ETH
								</div>
							</div>
						</div>
						<div>
							<h6 className="text-lg">4&#41; Artists Get Paid</h6>
							<div className="m-2 border-4 border-[--arbor-black] bg-gray-100 p-4">
								<ArtistBlocks />
								<div className="my-4 flex justify-center text-2xl">
									<TbArrowBigDownLines />
								</div>
								<div className="bg-multi m-2 flex min-h-20 items-center justify-center border-2 border-[--arbor-black] p-4 text-lg font-bold">
									.25 ETH PER ARTIST
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-white px-10 py-24">
				<div className="container mx-auto max-w-screen-xl">
					<h2 className="mb-5 text-3xl md:text-4xl">Why Create Here?</h2>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<div>
							<div className="mb-4">
								<p className="mb-2 text-lg font-semibold">Like having fun?</p>
								<p className="text-lg">
									Join our collaborative experiment with new internet friends from all over the world.
								</p>
							</div>
							<div className="mb-4">
								<p className="mb-2 text-lg font-semibold">Like open source?</p>
								<p className="text-lg">
									All stems and songs are dedicated to the public domain under the CC0 license. All files are hosted
									directly on IPFS.
								</p>
							</div>
							<div className="mb-4">
								<p className="mb-2 text-lg font-semibold">Like earning money?</p>
								<p className="text-lg">
									All projects are for sale as NFTs, and if you contributed a stem, you get paid (including royalties
									from secondary sales).
								</p>
							</div>
						</div>
						<div>
							<div className="mb-4">
								<p className="mb-2 text-lg font-semibold">Hard drive full of &quot;WIP&quot; tracks collecting dust?</p>
								<p className="text-lg">
									Dig through &apos;em. One of your gently used stems could be worth something on Arbor.
								</p>
							</div>
							<div className="mb-4">
								<p className="mb-2 text-lg font-semibold">Looking to expand your creative horizons?</p>
								<p className="text-lg">
									Every project comes with unique constraints, so every project serves as a fascinating creative
									exercise.
								</p>
							</div>
							<div className="mb-4">
								<p className="mb-2 text-lg font-semibold">Crunched for time?</p>
								<p className="text-lg">All contributions are welcome, even if it&apos;s just one stem.</p>
							</div>
						</div>
					</div>
					<div className="mt-10 text-center">
						<Link href="/projects" passHref>
							<ButtonPrimary color="purple">Explore Projects</ButtonPrimary>
						</Link>
					</div>
				</div>
			</section>
			<section className="px-10 py-24">
				<div className="container mx-auto max-w-screen-xl">
					<h2 className="mb-5 text-center text-3xl md:text-4xl">Frequently Asked Questions</h2>
					<Faq />
				</div>
			</section>
		</>
	)
}

// type Project = {
// 	_id: string
// 	name: string
// 	description: string
// 	stems: string[]
// 	trackLimit: number
// 	collaborators: string[]
// 	tags: string[]
// }

// type HomeProps = {
// 	projects: Project[]
// }
// export const getServerSideProps = async () => {
// 	const result = await get('/projects/recent')
// 	return {
// 		props: {
// 			projects: result.data,
// 		},
// 	}
// }
