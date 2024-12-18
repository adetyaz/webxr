import Link from 'next/link'

export const CallToAction = () => {
	return (
		<div className='flex items-center justify-center relative z-10 py-16 md:py-20'>
			<div className='p-2 w-96 h-80 flex items-center justify-center bg-gradient-to-b from-blue-500 to-pink-500 rounded-3xl'>
				<div className='text-center size-full flex flex-col items-center justify-center bg-[#121212] rounded-2xl'>
					<h1 className='text-white font-bold mb-4 text-3xl'>Create Profile</h1>
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
	)
}
