import React from 'react'
import Image from 'next/image'
import Link from 'next/link' // Use Link for navigation

const Footer = () => {
	return (
		<footer className='text-white bg-gradient-to-b md:bg-gradient-to-r from-[#30D8FF] via-[#A32CC4] to-[#C243FE] py-10 px-8 md:px-16 grid gap-y-12'>
			<div className='grid gap-16 md:gap-y-0 md:grid-cols-3 items-start'>
				<div>
					<Link href='https://myriadflow.com/' passHref>
						<Image
							src='/MFlogo.png'
							width={350}
							height={350}
							alt='logo'
							className='mb-6'
						/>
					</Link>
					<p className='md:w-[350px] text-sm'>
						Innovative next-gen platform for exploring and launching NFT
						Xperiences with AI-powered brand ambassadors and no-code tools.
					</p>
				</div>

				<div className='flex justify-between items-start'>
					<div className='text-sm grid gap-y-2'>
						<h3 className='text-2xl font-semibold mb-6'>About</h3>
						<Link href='/MyriadFlow_Terms_of_Service.pdf' target='_blank'>
							Terms of Service
						</Link>
						<Link
							href='/MyriadFlow_Creator_Terms_and_Conditions.pdf'
							target='_blank'
						>
							Creator Terms and Conditions
						</Link>
						<Link href='/MyriadFlow_Privacy_Policy.pdf' target='_blank'>
							Privacy Policy
						</Link>
						<Link href='/MyriadFlow_Community_Guidelines.pdf' target='_blank'>
							Community Guidelines
						</Link>
					</div>
					<div className='text-sm grid gap-y-2'>
						<h3 className='text-2xl font-semibold mb-6'>Platform</h3>
						<Link href='https://studio.myriadflow.com'>Studio</Link>
						<Link href='https://discover.myriadflow.com'>Discover</Link>
						<Link href='https://webxr.myriadflow.com'>WebXR</Link>
					</div>
				</div>

				<div className='flex justify-end gap-6 self-center'>
					{['/Vector3.png', '/Vector4.png', '/Vector2.png', '/Vector5.png'].map(
						(icon, index) => (
							<div
								key={index}
								className='rounded-full size-14 border-2 border-white p-4 bg-[#282A33]'
							>
								<Link href='#' target='_blank'>
									<Image src={icon} width={20} height={20} alt='Social Icon' />
								</Link>
							</div>
						)
					)}
				</div>
			</div>
			<div>
				<hr className='sm:hidden' />
				<p>© Copyright 2024 MyriadFlow. All rights reserved</p>
			</div>
		</footer>
	)
}

export default Footer
