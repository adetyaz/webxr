import Image from 'next/image'
import Link from 'next/link' // Use Link for navigation

const Footer = () => {
	return (
		<footer className='bg-gradient-to-b from-[#30D8FF] to-[#EE64ED]  py-16 px-8'>
			<div className='flex flex-col md:flex-row justify-between md:items-center gap-8'>
				<div className='brand text-left'>
					<Link href='https://myriadflow.com/' passHref>
						<Image
							src='/MFlogo.png'
							alt='logo'
							height={100}
							width={250}
							className='mb-4'
						/>
					</Link>
					<p className='text-white max-w-350 text-sm sm:text-base'>
						Innovative next-gen platform for exploring and launching NFT
						Xperiences with AI-powered brand ambassadors and no-code tools.
					</p>
				</div>

				<div className='flex items-baseline justify-between'>
					<div className='text-left text-white text-sm sm:text-base'>
						<h3 className='text-xl font-semibold'>About</h3>
						<Link
							href='/MyriadFlow_Terms_of_Service.pdf'
							target='_blank'
							className='text-white hover:underline block mt-7'
						>
							Terms of Service
						</Link>
						<Link
							href='/MyriadFlow_Creator_Terms_and_Conditions.pdf'
							target='_blank'
							className='text-white hover:underline block'
						>
							Creator Terms and Conditions
						</Link>
						<Link
							href='/MyriadFlow_Privacy_Policy.pdf'
							target='_blank'
							className='text-white hover:underline block'
						>
							Privacy Policy
						</Link>
						<Link
							href='/MyriadFlow_Community_Guidelines.pdf'
							target='_blank'
							className='text-white hover:underline block'
						>
							Community Guidelines
						</Link>
					</div>
					<div className='text-left text-white text-sm sm:text-base'>
						<h3 className='text-xl font-semibold'>Platform</h3>
						<Link
							href='https://studio.myriadflow.com'
							target='_blank'
							className='text-white hover:underline block mt-7'
						>
							Studio
						</Link>
						<Link
							href='https://discover.myriadflow.com'
							target='_blank'
							className='text-white hover:underline block'
						>
							Discover
						</Link>
						<Link
							href='https://webxr.myriadflow.com'
							target='_blank'
							className='text-white hover:underline block'
						>
							WebXR
						</Link>
					</div>
				</div>

				<div className='social-links flex justify-center md:justify-end gap-5'>
					{['/Vector3.png', '/Vector4.png', '/Vector2.png', '/Vector5.png'].map(
						(icon, index) => (
							<div
								key={index}
								className='rounded-full flex justify-center border border-solid border-white p-4 bg-[#121212]'
							>
								<Link href='#' target='_blank'>
									<Image
										src={icon}
										alt='Social Icon'
										height={15}
										width={15}
										className='md:size-8 '
									/>
								</Link>
							</div>
						)
					)}
				</div>
			</div>
			<p className='mt-6 text-white text-xs'>
				© Copyright 2024 MyriadFlow. All rights reserved
			</p>
		</footer>
	)
}

export default Footer
