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

	const results = useQuery({
		queryKey: ['mainFanTokens'],
		queryFn: async () => {
			const results = await getFanMainTokens()
			// Count occurrences of each contract address
			const addressCount = results.reduce(
				(acc: Record<string, number>, token: any) => {
					const address = token.nftContractAddress // Use the correct property name here
					acc[address] = (acc[address] || 0) + 1
					return acc
				},
				{}
			)

			// Find top 3 addresses with the highest counts
			const topThree = Object.entries(addressCount as Record<string, number>)
				.sort(([, countA], [, countB]) => countB - countA)
				.slice(0, 3) // Take the top 3 items
				.map(([address, count]) => ({ address, count })) // Return only the addresses

			const topThreeAddresses = topThree.map((item: any) => item.address)
			const counts = topThree.map((item: any) => item.count)
			setCount(counts as number[])

			const allPhygitals = await getPhygitals()

			// Get the ids for each address in the order of topThreeAddresses
			const orderedPhygitalIds = topThreeAddresses.map((address: string) => {
				// Find phygitals that match the current address
				const matchedPhygital = allPhygitals.find(
					(phygital: any) => phygital.contract_address === address
				)
				// Return the id if a match is found, otherwise return null
				return matchedPhygital
					? {
							id: matchedPhygital.id,
							name: matchedPhygital.name,
					  }
					: null
			})

			const allAvatars = await getAvatars()

			// Get avatars in the order of filteredPhygitalIds
			const orderedAvatars = orderedPhygitalIds.map((phygital: any) => {
				// Find the avatar that matches the current phygital_id
				const matchedAvatar = allAvatars.find(
					(avatar: any) => avatar.phygital_id === phygital?.id
				)
				// Return the avatar if a match is found, otherwise return null
				return matchedAvatar
					? {
							...matchedAvatar,
							phygitalName: phygital.name,
					  }
					: null
			})

			// console.log(orderedAvatars, 'ordered avatars');
			return orderedAvatars
		},
	})

	const topAvatars = results.data

	return (
		<div className='py-32 md:py-40 relative z-10'>
			{/* Title */}
			<div className='px-16 mb-8 flex gap-4'>
				<div className='bg-[#DF1FDD] h-16 w-2'></div>
				<h1 className='font-bold text-white text-3xl md:text-6xl'>
					Avatar Leaderboard
				</h1>
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
									href={`https://webxr.myriadflow.com/${topAvatars?.[1].phygitalName
										.toLowerCase()
										.replace(/\s+/g, '-')}`}
									rel='noopener noreferrer'
									target='_blank'
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
									href={`https://webxr.myriadflow.com/${topAvatars?.[0].phygitalName
										.toLowerCase()
										.replace(/\s+/g, '-')}`}
									rel='noopener noreferrer'
									target='_blank'
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
									href={`https://webxr.myriadflow.com/${topAvatars?.[2].phygitalName
										.toLowerCase()
										.replace(/\s+/g, '-')}`}
									rel='noopener noreferrer'
									target='_blank'
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
			<div className='bg-gray-800 md:relative'>
				<Image
					width={150}
					height={150}
					src='/trophy1.png'
					alt='Left Trophy'
					className='absolute top-[14%] md:top-0 right-1 md:right-[unset] md:left-10 w-24 h-24'
				/>
				<Image
					width={150}
					height={150}
					src='/trophy2.png'
					alt='Right Trophy'
					className='absolute top-[85%] md:top-0 left-1 md:left-[unset] md:right-10 w-24 h-24'
				/>
				<h1
					className='text-center text-3xl md:text-4xl font-bold gradient-text-banner-2 text-transparent py-4 px-2 md:px-0'
					style={{ WebkitTextFillColor: 'transparent' }}
				>
					Rewarding Creators, Owners and Supporters.
				</h1>
			</div>
		</div>
	)
}

export default AvatarLeaderboard
