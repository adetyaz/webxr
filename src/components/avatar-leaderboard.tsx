import { Avatar } from '@readyplayerme/visage'
import Link from 'next/link'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getAvatars, getFanTokens } from '@/utils/queries'
import { AvatarType, FanTokenType } from '@/types/types'
import Image from 'next/image'

const AvatarLeaderboard = () => {
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
				queryKey: ['fantokens'],
				queryFn: getFanTokens,
			},
		],
	})

	const [avatarsResult, fantokenResults] = results

	const topAvatarsResult = useQuery({
		queryKey: ['topAvatars'],
		queryFn: () => getTopAvatars(avatarsResult.data, fantokenResults.data),
	})

	const topAvatars = topAvatarsResult.data

	return (
		<div>
			{/* Title */}
			<div className='font-bold text-white text-5xl px-16 mb-8'>
				Avatar Leaderboard
			</div>

			{/* Top Performing Avatars Section */}

			{topAvatars && (
				<div className='flex justify-between px-16'>
					<h2 className='text-white text-2xl'>
						{"This Week's Top Performing AI-Powered Brand Ambassadors"}
					</h2>
				</div>
			)}

			{topAvatars && (
				<div className='flex flex-wrap justify-center px-10 py-20 '>
					{/* Silver */}
					<div className='w-full md:w-1/3 flex flex-col order-2 md:order-none items-center justify-center mb-10 md:mb-0'>
						{topAvatars?.[1] && (
							<>
								<Avatar
									modelSrc={topAvatars?.[1].url!}
									cameraInitialDistance={3.2}
								/>
								<div className='relative mt-4'>
									<Image
										height={150}
										width={150}
										src='/silver.png'
										alt='Silver'
										className='w-full h-auto object-cover'
									/>
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold text-white'>
										SILVER
									</div>
								</div>
								<div className='text-white flex justify-center mt-4 mb-8'>
									No. tokens: {topAvatars?.[1].count}
								</div>
								<Link
									href={`https://webxr.myriadflow.com/${topAvatars?.[1].phygital_id}`}
								>
									<button className='text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
										WEBXR
									</button>
								</Link>
							</>
						)}
					</div>

					{/* Gold */}
					<div className='w-full md:w-1/3 flex flex-col order-1 md:order-none items-center justify-center mb-10 md:mb-0'>
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
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-bold text-white'>
										GOLD
									</div>
								</div>
								<div className='text-white flex justify-center mt-4 mb-8'>
									No. tokens: {topAvatars?.[0].count}
								</div>
								<Link
									href={`https://webxr.myriadflow.com/${topAvatars?.[0].phygital_id}`}
								>
									<button className='text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
										WEBXR
									</button>
								</Link>
							</>
						)}
					</div>

					{/* Bronze */}
					<div className='w-full md:w-1/3 flex flex-col order-3 md:order-none items-center justify-center'>
						{topAvatars?.[2] && (
							<>
								<Avatar
									modelSrc={topAvatars?.[2].url!}
									cameraInitialDistance={3.5}
								/>
								<Image
									height={150}
									width={150}
									src='/bronze.png'
									alt='Bronze'
									className='w-3/5 object-cover mt-4'
								/>
								<div className='text-white flex justify-center mt-4 mb-8'>
									No. tokens: {topAvatars?.[2].count}
								</div>
								<Link
									href={`https://webxr.myriadflow.com/${topAvatars?.[2].phygital_id}`}
								>
									<button className='text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
										WEBXR
									</button>
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
				<div className='text-center text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text py-4'>
					Rewarding Creators, Owners and Supporters.
				</div>
			</div>
		</div>
	)
}

export default AvatarLeaderboard
