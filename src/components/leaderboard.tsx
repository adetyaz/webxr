'use client'

import { useQuery } from '@tanstack/react-query'
import AvatarCard from './avatar-card'
import { getAvatars, getBrands, getPhygitals } from '@/utils/queries'
import { AvatarType } from '@/types/types'

const Leaderboard = ({
	reversed,
	tagline,
	title,
	subtitle,
}: {
	reversed?: boolean
	tagline: string
	title: string
	subtitle: string
}) => {
	const result = useQuery({
		queryKey: ['avatarsList'],
		queryFn: async () => {
			const avatars = await getAvatars()
			const phygitals = await getPhygitals()
			const brands = await getBrands()

			const avatarsWithNames = avatars.map((avatar: AvatarType) => {
				const matchingPhygital = phygitals.find(
					(p: {
						id: string
						name: string
						brand_name: string
						image: string
					}) => p.id === avatar.phygital_id
				)

				const brandLogo =
					brands.find(
						(b: { name: string; logo: string }) =>
							b.name === matchingPhygital?.brand_name
					)?.logo_image || ''

				return {
					...avatar,
					phygitalName: matchingPhygital?.name || '',
					phygitalImage: matchingPhygital?.image || '',
					brandLogo,
				}
			})

			return avatarsWithNames
		},
	})
	const avatars = result.data?.sort(
		(a: AvatarType, b: AvatarType) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	)

	return (
		<>
			<div className='px-16 pt-20 relative z-10'>
				<span className='text-lg font-semibold mt-6 text-[#DF1FDD]'>
					{tagline}
				</span>
				<h1 className='text-3xl md:text-6xl font-semibold mt-6 text-white'>
					{title}
				</h1>
				<p className='text-xl font-semibold mt-6 text-white'>{subtitle}</p>
			</div>

			{!reversed ? (
				<div className='pt-20 flex gap-9 flex-wrap justify-center'>
					{avatars?.slice(0, 4).map(
						(
							avatar: AvatarType & {
								phygitalName: string
								phygitalImage: string
								brandLogo: string
							},
							index: number
						) => (
							<AvatarCard
								key={index}
								phygitalId={avatar.phygitalName}
								phygitalImage={avatar.phygitalImage}
								url={avatar.url}
								brandLogo={avatar.brandLogo}
							/>
						)
					)}
				</div>
			) : (
				<div className='pt-20 flex gap-9 flex-wrap justify-center'>
					{avatars
						?.slice(6, 10)
						.reverse()
						.map(
							(
								avatar: AvatarType & {
									phygitalName: string
									phygitalImage: string
									brandLogo: string
								},
								index: number
							) => (
								<AvatarCard
									key={index}
									phygitalId={avatar.phygitalName}
									phygitalImage={avatar.phygitalImage}
									url={avatar.url}
									brandLogo={avatar.brandLogo}
								/>
							)
						)}
				</div>
			)}
		</>
	)
}

export default Leaderboard
