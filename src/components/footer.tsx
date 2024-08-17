import React from 'react'
import Image from 'next/image'
import Link from 'next/link' // Use Link for navigation

const Footer = () => {
	return (
		<footer className='bg-gradient-to-r from-indigo-500 to-purple-600 py-20 px-10 text-white'>
			{/* Brand Section */}
			<div className='flex justify-between items-center'>
				<div className='brand'>
					<Link href='#' passHref>
						<img
							src='/logo.png'
							alt='logo'
							width={300}
							height={300}
							className='my-10'
						/>
					</Link>
					<p>
						Revolutionary platform for exploring and launching NFT Xperiences.
					</p>
					<p className='mt-10 mb-4'>
						© Copyright 2023 - 2024 MyriadFlow. All rights reserved
					</p>
				</div>

				{/* Connect Section */}
				<div
					id='connect'
					className='flex flex-col justify-center items-center gap-6'
				>
					<div className='rounded-full border-2 border-indigo-500 bg-indigo-900 p-4 flex items-center gap-2'>
						<Link href='https://discord.gg/38jktRtuY7' target='_blank'>
							<img
								src='./Vector3.png'
								alt='Discord logo'
								width={20}
								height={20}
							/>
						</Link>
					</div>
					<div className='rounded-full border-2 border-indigo-500 bg-indigo-900 p-4 flex items-center gap-2'>
						<Link href='https://t.me/MyriadFlow' target='_blank'>
							<img
								src='./Vector4.png'
								alt='Telegram logo'
								width={20}
								height={20}
							/>
						</Link>
					</div>
					<div className='rounded-full border-2 border-indigo-500 bg-indigo-900 p-4 flex items-center gap-2'>
						<Link href='https://x.com/0xMyriadFlow' target='_blank'>
							<img src='./Vector2.jpeg' alt='X logo' width={18} height={18} />
						</Link>
					</div>
					<div className='rounded-full border-2 border-indigo-500 bg-indigo-900 p-4 flex items-center gap-2'>
						<Link href='https://www.instagram.com/0xmyriadflow' target='_blank'>
							<img
								src='./Vector5.png'
								alt='Instagram logo'
								width={16}
								height={16}
							/>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
