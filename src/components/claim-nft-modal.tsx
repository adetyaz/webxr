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
			<div className='relative px-4 pb-4 pt-4 mt-10 md:mt-0 bg-white text-black rounded-lg shadow-lg z-50'>
				<div className='flex justify-around md:justify-center gap-4'>
					<h1 className='text-xl md:text-3xl font-bold text-center text-black md:py-4'>
						You Have Claimed Your
						<br />
						Free NFT Fan Token
					</h1>
					<Image
						src='/trophy1.png'
						alt='trophy'
						height={100}
						width={150}
						className=' md:-mt-16 size-14 md:w-[150px] md:h-[150px]'
					/>
				</div>

				<div className='flex flex-col md:flex-row justify-center md:justify-around md:pl-10 gap-4'>
					<Image
						src={`${'https://nftstorage.link/ipfs'}/${removePrefix(freeNft)}`}
						alt='Free NFT Image'
						height={0}
						width={150}
						className='h-32 mx-auto md:mx-0'
					/>

					<div>
						<p className='text-xl pt-0 md:px-10'>
							By owning this NFT, you show your support to {brandName} and help
							them reach higher on the MyriadFlow avatar leaderboard!
						</p>
						<p className='text-xl pt-5 md:px-10 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-500 to-purple-800'>
							Rewards are distributed to top 3 avatar creators, owners and
							supporters each week.
						</p>
						<div className='flex items-center pt-10 pb-8'>
							<Link href={'https://base-discover.vercel.app/profile'}>
								<button className='w-fit mx-auto text-black text-center text-base py-2 px-4 md:px-8 rounded-full bg-blue-400 focus:ring-4 focus:outline-none'>
									View in my assets
								</button>
							</Link>

							<button
								className='w-fit md:w-2/5  mx-auto text-black text-center text-base py-2 rounded-full border border-purple-800 focus:ring-4 focus:outline-none'
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
