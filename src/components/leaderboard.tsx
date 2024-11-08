'use client'

import { useQuery } from '@tanstack/react-query'
import AvatarCard from './avatar-card'
import { getAvatars, getPhygitals } from '@/utils/queries'
import { AvatarType } from '@/types/types'

const Leaderboard = () => {
	const result = useQuery({
		queryKey: ['avatarsList'],
		queryFn: async () => {
			const avatars = await getAvatars()
			const phygitals = await getPhygitals()
			
			const avatarsWithNames = avatars.map((avatar: AvatarType) => ({
				...avatar,
				phygitalName: phygitals.find((p: { id: string; name: string }) => p.id === avatar.phygital_id)?.name || ''
			}))
			
			return avatarsWithNames.reverse()
		},
	})
	const avatars = result.data

	return (
		<>
			<div className='bg-black relative z-10'>
				<h1
					className='text-center font-bold text-4xl py-[20px] bg-[#00000021] gradient-text-banner text-transparent '
					style={{ WebkitTextFillColor: 'transparent' }}
				>
					More than NFTs.
				</h1>
			</div>

			<div className='px-16 pt-20 relative z-10'>
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
					.map((avatar: AvatarType & { phygitalName: string }, index: number) => (
						<AvatarCard
							key={index}
							phygitalId={avatar.phygitalName}
							url={avatar.url}
						/>
					))}
			</div>
		</>
	)
}

export default Leaderboard
