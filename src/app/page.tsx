'use client'
import Link from 'next/link'
import LeaderBoard from '@/components/leaderboard'
import AvatarLeaderboard from '@/components/avatar-leaderboard'
import Footer from '@/components/footer'
import Image from 'next/image'

import { ConnectWallet } from '@/components/connect-wallet'
import { CTA } from '@/components/cta'

export default function Home() {
	return (
		<div className='bg-[#121212] overflow-x-hidden'>
			<div className='px-10 flex justify-between pb-[10px] bg-gradient-to-r from-pink-100 via-blue-500 to-purple-500'>
				<div className='mt-4'>
					<Link href='/'>
						<Image src='/logo.png' width={200} height={0} alt='Logo' />
					</Link>
				</div>
				<div className='mt-6 hidden md:flex gap-12 text-[20px] text-white'>
					<Link href='https://myriadflow.com' target='_blank'>
						Home
					</Link>
					<Link href='https://discover.myriadflow.com' target='_blank'>
						Discover
					</Link>
					<Link href='https://studio.myriadflow.com' target='_blank'>
						Studio
					</Link>
					<Link href='https://webxr.myriadflow.com/' target='_blank'>
						WebXR
					</Link>
				</div>
				<div className='mt-6'>
					<ConnectWallet />
				</div>
			</div>
			<div className='flex flex-col md:flex-row h-fit bg-[#121212] text-white relative items-center'>
				<div className='absolute right-0 bottom-[0px] md:left-[25%] w-[140px] lg:w-[337px] h-[125px] lg:h-[316px] bg-[#11D9C5] rounded-full blur-3xl opacity-20' />
				<div className='absolute right-0 top-0 md:right-[10%] w-[140px] lg:w-[337px] h-[125px] lg:h-[316px] bg-[#DF1FDD] rounded-full blur-3xl opacity-20' />

				<div className='md:px-16 px-8 py-12 flex flex-col justify-center  md:basis-3/5'>
					<div className='text-5xl md:text-7xl font-bold text-[#DF1FDD]'>
						WebXR
					</div>
					<div className='text-4xl md:text-6xl font-semibold mt-6 text-[#DF1FDD] w-full'>
						Experience & Interact
					</div>
					<div className='text-2xl mt-10'>
						Interact with unique AI-powered avatars and brand ambassadors. Buy a
						phygital and own the avatar. Customize and rise to the Leaderboard.
					</div>
					<div className='mt-10'>
						<ConnectWallet />
					</div>
				</div>
				<Image
					src='/heroframe.png'
					alt='AI Avatar'
					height={300}
					width={300}
					className='mx-auto size-72'
				/>
			</div>

			<div className='bg-black py-4'>
				<p className='text-center font-bold text-[30px] gradient-text'>
					More than NFTs.
				</p>
			</div>

			<div className='grid gap-y-8'>
				<LeaderBoard />
				<AvatarLeaderboard />
				<CTA />
			</div>
			<Footer />
		</div>
	)
}
