export const CTA = () => {
	return (
		<div className='bg-[#121212] py-12'>
			<div className='bg-gradient-to-b from-[#30D8FF] to-[#EE64ED] p-2 rounded-[2rem] mx-auto h-fit w-fit'>
				<div className='text-center text-white bg-[#121212] h-80 w-60 rounded-[2rem] flex flex-col items-center justify-center gap-4 px-4 py-12'>
					<h1 className='font-bold text-3xl'>Create Profile</h1>
					<p>& Earn Rewards</p>
					<p>
						Connect your wallet on desktop and create a unique profile. Get
						involved in the community, become a verified brand supporter, and
						earn rewards!
					</p>
					<div className='bg-gradient-to-r from-[#30D8FF] to-[#EE64ED] rounded p-1'>
						<button className='rounded bg-white text-black px-2 py-1'>
							Copy Link
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
