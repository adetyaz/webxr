'use client'

import { useQuery } from '@tanstack/react-query'
import AvatarCard from './avatar-card'
import { getAvatars } from '@/utils/queries'
import { AvatarType } from '@/types/types'

const Leaderboard = () => {
	const chaintype = process.env.NEXT_PUBLIC_BASECHAINTYPE

	const result = useQuery({
		queryKey: ['avatars'],
		queryFn: async () => {
			const avatars = await getAvatars()
			return avatars
				.find((avatar: AvatarType) => avatar.chaintype_id === chaintype)
				.reverse()
		},
	})

	const avatars = result.data

	return (
		<>
			<div className='bg-black relative'>
				<div
					className='text-center font-bold text-[30px] py-[20px] bg-[#00000021] bg-gradient-to-r from-pink-500 via-pink-500 to-blue-500 text-transparent bg-clip-text'
					style={{ WebkitTextFillColor: 'transparent' }}
				>
					More than NFTs.
				</div>
			</div>

			<div className='px-16 pt-20'>
				<div className='text-lg font-semibold mt-6 text-[#DF1FDD]'>
					Most Recently Launched
				</div>
				<div className='text-6xl font-semibold mt-6 text-white'>
					New on WebXR
				</div>
				<div className='text-xl font-semibold mt-6 text-white'>
					New Frontier: Be Among the First to Discover the Newest Xperiences
					Making Their Debut!
				</div>
			</div>

			<div className='pt-20 flex gap-9 flex-wrap justify-center'>
				{avatars
					?.slice(0, 12)
					.reverse()
					.map((avatar: AvatarType, index: number) => (
						<AvatarCard
							key={index}
							phygitalId={avatar.phygital_id}
							url={avatar.url}
						/>
					))}
			</div>
		</>
	)
}

export default Leaderboard
