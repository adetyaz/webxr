import { Avatar } from '@readyplayerme/visage'
import Link from 'next/link'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getAvatars, getFanTokens, getPhygitals } from '@/utils/queries'
import { AvatarType, FanTokenType } from '@/types/types'
import Image from 'next/image'
import { getFanMainTokens } from '../utils/queries'
import { useState } from 'react'


const AvatarLeaderboard = () => {
	const [count, setCount] = useState<number[]>([])

	// const getTopAvatars = (avatars: AvatarType[], fantokens: FanTokenType[]) => {
	// 	const avatarTokenCount = avatars?.reduce((count, avatar) => {
	// 		count[avatar.phygital_id] = fantokens.filter(
	// 			(token) => token.phygital_id === avatar.phygital_id
	// 		).length
	// 		return count
	// 	}, {} as Record<string, number>)

	// 	const topAvatarsData = Object.entries(avatarTokenCount)
	// 		.sort(([, countA], [, countB]) => countB - countA)
	// 		.slice(0, 3)
	// 		.map(([phygitalId, count]) => {
	// 			const avatar = avatars.find((a) => a.phygital_id === phygitalId)
	// 			return { ...avatar, count }
	// 		})

	// 	return topAvatarsData
	// }

	const results = useQueries({
		queries: [
			{
				queryKey: ['avatars'],
				queryFn: getAvatars,
			},
			{
				queryKey: ['mainFanTokens'],
				queryFn: async () => {
					const results = await getFanMainTokens();
					// Count occurrences of each contract address
					const addressCount = results.reduce((acc: Record<string, number>, token: any) => {
							const address = token.nftContractAddress;  // Use the correct property name here
							acc[address] = (acc[address] || 0) + 1;
							return acc;
					}, {});
			
				 // Find top 3 addresses with the highest counts
				 const topThree = Object.entries(addressCount as Record<string, number>)
				 .sort(([, countA], [, countB]) => countB - countA)
				 .slice(0, 3)  // Take the top 3 items
				 .map(([address, count]) => ({address, count})); // Return only the addresses
 
				 const topThreeAddresses = topThree.map((item: any) => item.address);
				 const counts = topThree.map((item: any) => item.count);
				 setCount(counts as number[]);

				 const allPhygitals = await getPhygitals();

				// Filter phygitals by top 3 addresses and extract the ids
				const filteredPhygitalIds = allPhygitals
				.filter((phygital: any) => {
					const match = topThreeAddresses.includes(phygital.contract_address);
					return match;
				})
				.map((phygital: any) => phygital.id);

				const allAvatars = await getAvatars();
				const matchedAvatars = allAvatars
						.filter((avatar: any) => {
								const match = filteredPhygitalIds.includes(avatar.phygital_id);
								return match;
						})
						.map((avatar: any) => avatar);
				return matchedAvatars;
			},
			},
			{
				queryKey: ['fanTokens'],
				queryFn: getFanTokens,
			},
			
		],
	})

	const [avatarsResult, fanTokenMainResults, fanTokenResults] = results

	// const topAvatarsResult = useQuery({
	// 	queryKey: ['topAvatars'],
	// 	queryFn: () => getTopAvatars(avatarsResult.data, fanTokenResults.data),
	// })

	const topAvatars = fanTokenMainResults.data

	return (
		<div className='py-32 md:py-40 relative z-10'>
			{/* Title */}
			<div className='px-16 mb-8 flex gap-4'>
				<div className='bg-[#DF1FDD] h-16 w-2'></div>
				<h1 className='font-bold text-white text-6xl'>Avatar Leaderboard</h1>
			</div>

			{/* Top Performing Avatars Section */}

			{topAvatars && (
				<div className='flex justify-between px-16 pb-12'>
					<h2 className='text-white text-2xl'>
						{"This Week's Top Performing AI-Powered Brand Ambassadors"}
					</h2>
				</div>
			)}

			{topAvatars && (
				<div className='flex flex-wrap items-end justify-center px-10 py-20 bg-[#ffffff42] relative '>
					{/* Silver */}
					<div className='h-max md:h-[30rem] w-full md:w-1/3 flex flex-col items-center justify-center mb-10 md:mb-0 '>
						{topAvatars?.[1] && (
							<>
								<Avatar
									modelSrc={topAvatars?.[1].url!}
									cameraInitialDistance={2.5}
								/>
								<div className='relative mt-4'>
									<Image
										height={150}
										width={150}
										src='/silver.png'
										alt='Silver'
										className='w-full h-auto object-cover'
									/>
								</div>
								<div>
									<div className='text-white flex gap-4 items-center justify-center mt-4 text-xl'>
										<Image src='/star.png' alt='star' width={20} height={20} />
										{count[1] * 100}
										<Image src='/star.png' alt='star' width={20} height={20} />
									</div>
									<p className='text-center text-xl text-white mb-4'>
										star points
									</p>
								</div>

								<Link
									href={`https://webxr.myriadflow.com/${topAvatars?.[1].phygital_id}`}
								>
									<div className='bg-gradient-to-b from-[#999999] to-[#DD21DD]  text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
										WEBXR
									</div>
								</Link>
							</>
						)}
						<div className='h-12'></div>
					</div>

					{/* Gold */}
					<div className='h-max md:h-[35rem] w-full md:w-1/3 flex flex-col items-center justify-center mb-10 md:mb-0'>
						{topAvatars?.[0] && (
							<>
								<Avatar
									modelSrc={topAvatars?.[0].url!}
									cameraInitialDistance={3}
								/>
								<div className='relative mt-4'>
									<Image
										height={150}
										width={150}
										src='/gold.png'
										alt='Gold'
										className='w-full h-auto object-cover'
									/>
								</div>
								<div>
									<div className='text-white flex gap-4 items-center justify-center mt-4 text-xl'>
										<Image src='/star.png' alt='star' width={20} height={20} />
										{count[0] * 100}
										<Image src='/star.png' alt='star' width={20} height={20} />
									</div>
									<p className='text-center text-xl text-white mb-4'>
										star points
									</p>
								</div>
								<Link
									href={`https://webxr.myriadflow.com/${topAvatars?.[0].phygital_id}`}
								>
									<div className='bg-gradient-to-b from-[#999999] to-[#DD21DD]  text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
										WEBXR
									</div>
								</Link>
							</>
						)}
						<div className='h-28'></div>
					</div>

					{/* Bronze */}
					<div className='h-max md:h-[30rem] w-full md:w-1/3 flex flex-col items-center justify-center'>
						{topAvatars?.[2] && (
							<>
								<Avatar
									modelSrc={topAvatars?.[2].url!}
									cameraInitialDistance={0.5}
								/>
								<Image
									height={150}
									width={150}
									src='/bronze.png'
									alt='Bronze'
									className='w-3/5 object-cover mt-4'
								/>
								<div>
									<div className='text-white flex gap-4 items-center justify-center mt-4 text-xl'>
										<Image src='/star.png' alt='star' width={20} height={20} />
										{count[2] * 100}
										<Image src='/star.png' alt='star' width={20} height={20} />
									</div>
									<p className='text-center text-xl text-white mb-4'>
										star points
									</p>
								</div>

								<Link
									href={`https://webxr.myriadflow.com/${topAvatars?.[2].phygital_id}`}
								>
									<div className='bg-gradient-to-b from-[#999999] to-[#DD21DD] text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
										WEBXR
									</div>
								</Link>
							</>
						)}
					</div>
				</div>
			)}

			{/* Background with Trophies */}
			<div className='bg-gray-800 relative'>
				<Image
					width={100}
					height={100}
					src='/trophy1.png'
					alt='Left Trophy'
					className='absolute top-0 left-10 w-24 h-24'
				/>
				<Image
					width={100}
					height={100}
					src='/trophy2.png'
					alt='Right Trophy'
					className='absolute top-0 right-10 w-24 h-24'
				/>
				<h1
					className='text-center text-4xl font-bold gradient-text-banner-2 text-transparent py-4'
					style={{ WebkitTextFillColor: 'transparent' }}
				>
					Rewarding Creators, Owners and Supporters.
				</h1>
			</div>

			{/* Call to Action */}
			<div className='flex items-center justify-center min-h-screen relative z-10 '>
				<div className='p-2 w-96 h-80 flex items-center justify-center bg-gradient-to-b from-blue-500 to-pink-500 rounded-3xl'>
					<div className='text-center size-full flex flex-col items-center justify-center bg-[#121212] rounded-2xl'>
						<h1 className='text-white font-bold mb-4 text-3xl'>
							Create Profile
						</h1>
						<p className='mb-4 text-white text-xl'>& Earn Rewards</p>
						<Link href={'https://base-discover.vercel.app/profile'}>
							<button className='rounded-lg px-2 py-3 bg-gradient-to-r from-purple-700 to-blue-500 text-black cursor-pointer hover:scale-105 transition-transform duration-300'>
								<span className='size-full bg-white py-2 px-6 rounded'>
									Get Started
								</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AvatarLeaderboard

// background: linear-gradient(0deg, #DD21DD 0%, #999999 100%);



// [
// 	{
// 			"ID": "cd048436-ba08-4a41-aed6-874f7ff36589",
// 			"creatorWallet": "0x11665C74d68B76dd16937E9aB0BC336BC4608b86",
// 			"nftContractAddress": "0xee842ad1fc66b7f0eed270117e36914c004859ed",
// 			"token_id": "5",
// 			"amount": "1",
// 			"data": "0x0",
// 			"txHash": "0x9eb11900c0597886413bb4657bb67f1fefa5248fd6196b7e2839335ead0fcf67",
// 			"created_at": "2024-09-30T05:09:11.399965Z",
// 			"updated_at": "2024-09-30T05:09:11.399965Z"
// 	},
// 	{
// 			"ID": "c3878431-4121-4ef2-99e6-7966bc1847f4",
// 			"creatorWallet": "0x11665C74d68B76dd16937E9aB0BC336BC4608b86",
// 			"nftContractAddress": "0x33D2De72f00A78DA0Af6739EE664f06e6ACe21E9",
// 			"token_id": "6",
// 			"amount": "1",
// 			"data": "0x0",
// 			"txHash": "0xa5040fce2bbf18075b86d27406e00ec5102b44658a2940c7d4ba7ef5b72b191e",
// 			"created_at": "2024-09-30T05:38:26.356657Z",
// 			"updated_at": "2024-09-30T05:38:26.356657Z"
// 	},
// 	{

// ]