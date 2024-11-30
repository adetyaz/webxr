'use client'
import LeaderBoard from '@/components/leaderboard'
import AvatarLeaderboard from '@/components/avatar-leaderboard'
import Footer from '@/components/footer'
import Header from '../components/header'
import { Hero } from '@/components/hero'
import { CallToAction } from '@/components/call-to-action'

export default function Home() {
	return (
		<main className='bg-black overflow-x-hidden'>
			<Header home />
			<Hero />

			<div className='relative'>
				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40'
					style={{ backgroundImage: "url('/web-bg.png')" }}
				></div>
				{/* Overlay */}
				<div className='bg-black relative z-10'>
					<h1
						className='text-center font-bold text-4xl py-[20px] bg-[#00000021] gradient-text-banner text-transparent '
						style={{ WebkitTextFillColor: 'transparent' }}
					>
						More than NFTs.
					</h1>
				</div>
				<div className='absolute inset-0 bg-black bg-opacity-50'></div>
				<LeaderBoard
					tagline='Most Recently Launched'
					title='New on WebXR'
					subtitle='New Frontier: Be Among the First to Discover the Newest Xperiences
					Making Their Debut!'
				/>
				<AvatarLeaderboard />
				<LeaderBoard
					reversed
					tagline='Most Popular Right Now'
					title='Hot on WebXR'
					subtitle='Get in on the Action with These Hot Trending Xperiences!'
				/>
				<CallToAction />
			</div>

			<div className='bg-gradient-to-b from-[#121212] to-[#121212] '>
				<Footer />
			</div>
		</main>
	)
}
