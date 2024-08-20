import Link from 'next/link'
import Image from 'next/image'

export const ClaimNftModal = ({
	onClose,
	brandName,
	freeNft,
}: {
	onClose: (state: boolean) => void
	brandName: string
	freeNft: string
}) => {
	const handleClick = () => {
		onClose(false)
	}

	const removePrefix = (uri: string) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<>
			<div className='relative px-4 pb-4 pt-8 bg-white text-black rounded-lg shadow-lg'>
				<div className='flex justify-around'>
					<p className='text-3xl font-bold text-center text-black '>
						You Have Claimed Your
						<br />
						Free NFT Fan Token
					</p>
					<Image
						src='/trophy1.png'
						alt='trophy'
						height={100}
						width={150}
						className='-mt-16'
					/>
				</div>

				<div className='flex justify-around pl-10'>
					<Image
						src={`${'https://nftstorage.link/ipfs'}/${removePrefix(freeNft)}`}
						alt='Free NFT Image'
						height={0}
						width={150}
						className='h-32'
					/>

					<div>
						<p className='text-xl pt-0 pl-10 pr-10'>
							By owning this NFT, you show your support to {brandName} and help
							them reach higher on the MyriadFlow avatar leaderboard!
						</p>
						<p className='text-xl pt-5 pl-10 pr-10 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-500 to-purple-800'>
							Rewards are distributed to top 3 avatar creators, owners and
							supporters each week.
						</p>
						<div className='flex items-center pt-10 pb-8'>
							<Link href={'https://base-discover.vercel.app/profile'}>
								<button className='w-2/5 mx-auto text-black text-center text-base py-2 rounded-full bg-blue-400 focus:ring-4 focus:outline-none'>
									View in my assets
								</button>
							</Link>

							<button
								className='w-2/5 mx-auto text-black text-center text-base py-2 rounded-full border border-purple-800 focus:ring-4 focus:outline-none'
								onClick={handleClick}
							>
								Continue Experience
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
