import Image from 'next/image'
import { useEffect, useState } from 'react'

export const Hero = () => {
	const [isWideScreen, setIsWideScreen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsWideScreen(window.innerWidth >= 769)
		}

		// Check screen size on initial load
		handleResize()

		// Add event listener for window resize
		window.addEventListener('resize', handleResize)

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<section
			className='flex flex-col justify-between sm:block bg-[#111] text-white relative bg-cover bg-center pt-12'
			style={{ backgroundImage: isWideScreen ? 'url(/webXR.jpg)' : 'none' }}
		>
			<div className='md:w-1/2 h-full px-8 md:px-16 2xl:pr-36 pt-20 sm:py-20 md:py-56 flex flex-col justify-start'>
				<h1
					className='text-5xl md:text-7xl font-bold text-center sm:text-left gradient-text text-transparent'
					style={{ WebkitTextFillColor: 'transparent' }}
				>
					MyriadFlow <br /> WebXR
				</h1>
				<h2 className='text-2xl md:text-4xl font-semibold mt-6 text-white text-center sm:text-left'>
					Xperience & Interact
				</h2>
				<p className='text-2xl mt-10'>
					Interact with unique AI-powered avatars and brand ambassadors. Buy a
					phygital and own the avatar. Customize and rise to the Leaderboard.
				</p>
				<div className='mt-10 mb-12'>
					<w3m-button />
				</div>

				<div className='text-white text-2xl p-4 border-[#DF1FDD] bg-[#FFFFFF1A] border w-fit rounded-3xl'>
					Works best on Chrome browser!
				</div>
			</div>
			<Image
				className='sm:hidden mx-auto'
				src='/webxr.png'
				alt='lady with oculus gear image'
				height={100}
				width={300}
			/>
		</section>
	)
}
