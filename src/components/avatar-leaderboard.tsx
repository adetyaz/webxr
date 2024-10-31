import { Avatar } from '@readyplayerme/visage'
import Link from 'next/link'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getAvatars, getFanTokens } from '@/utils/queries'
import { AvatarType, FanTokenType } from '@/types/types'
import Image from 'next/image'
import { getFanMainTokens } from '../utils/queries'
import Moralis from 'moralis'
import { useAccount, useChainId, useConnect } from 'wagmi'
import { useEffect, useState } from 'react'

const AvatarLeaderboard = () => {
	// const { address } = useAccount()

	// const chainId = useChainId()

	const CHAIN_ID = 8453
	const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY

	const fetchNFTs = async (address: string) => {
		try {
			await Moralis.start({ apiKey })

			const assets = await Moralis.EvmApi.nft.getWalletNFTs({
				chain: CHAIN_ID,
				format: 'decimal',
				mediaItems: false,
				address,
			})

			//@ts-ignore
			console.log('NFTs:', assets.raw.result)
		} catch (e) {
			console.error(e)
		}
	}

	const getTopAvatars = (avatars: AvatarType[], fantokens: FanTokenType[]) => {
		const avatarTokenCount = avatars?.reduce((count, avatar) => {
			count[avatar.phygital_id] = fantokens.filter(
				(token) => token.phygital_id === avatar.phygital_id
			).length
			return count
		}, {} as Record<string, number>)

		const topAvatarsData = Object.entries(avatarTokenCount)
			.sort(([, countA], [, countB]) => countB - countA)
			.slice(0, 3)
			.map(([phygitalId, count]) => {
				const avatar = avatars.find((a) => a.phygital_id === phygitalId)
				return { ...avatar, count }
			})

		return topAvatarsData
	}

	const results = useQueries({
		queries: [
			{
				queryKey: ['avatars'],
				queryFn: getAvatars,
			},
			{
				queryKey: ['mainFanTokens'],
				queryFn: async () => {
					const results = await getFanMainTokens()
					return results
					// .map((token: any) => token.creatorWallet)
				},
			},
			{
				queryKey: ['fanTokens'],
				queryFn: getFanTokens,
			},
		],
	})

	const [avatarsResult, fanTokenMainResults, fanTokenResults] = results

	const topAvatarsResult = useQuery({
		queryKey: ['topAvatars'],
		queryFn: () => getTopAvatars(avatarsResult.data, fanTokenResults.data),
	})

	const topAvatars = topAvatarsResult.data

	// console.log(topAvatars)

	console.log(fanTokenMainResults.data)

	// console.log(fanTokenResults.data)

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
										{topAvatars?.[1].count * 100}
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
										{topAvatars?.[0].count * 100}
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
										{topAvatars?.[2].count * 100}
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
