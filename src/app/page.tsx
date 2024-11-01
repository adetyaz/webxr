'use client'
import LeaderBoard from '@/components/leaderboard'
import AvatarLeaderboard from '@/components/avatar-leaderboard'
import Footer from '@/components/footer'
import Image from 'next/image'

import Header from '../components/header'
import { Hero } from '@/components/hero'

export default function Home() {
	return (
		<div className='bg-black'>
			<Header home  />
			<Hero />
		
			<div className='relative'>
				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40'
					style={{ backgroundImage: "url('/web-bg.png')" }}
				></div>
				{/* Overlay */}
				<div className='absolute inset-0 bg-black bg-opacity-50'></div>
				<LeaderBoard />
				<AvatarLeaderboard />
			</div>

			<div className='bg-gradient-to-b from-[#121212] to-[#121212] '>
				<Footer />
			</div>
		</div>
	)
}
