import Link from 'next/link'
import { Avatar } from '@readyplayerme/visage'
import Image from 'next/image'
// import { Ellipsis } from 'lucide-react'
import { removePrefix } from '@/utils/helper'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const AvatarCard = ({
	phygitalId,
	phygitalImage,
	url,
	brandLogo,
}: {
	phygitalId: string
	phygitalImage: string
	url: string
	brandLogo: string
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const [isExpHovered, setIsExpHovered] = useState(false)
	const name = phygitalId.toLowerCase().replace(/\s+/g, '-')

	return (
		<div className='relative rounded-3xl bg-gradient-to-b from-pink-500 to-blue-500 p-[2px] shadow-md bg-[#FFFFFF1A] w-10/12 md:w-[18rem] md:h-[24rem]'>
			<div className='p-4 rounded-3xl grid grid-rows-[3fr_1fr] h-full w-full bg-[#2a2a2a] overflow-hidden'>
				<div className='flex justify-between items-start'>
					<Image
						src={`${'https://nftstorage.link/ipfs'}/${removePrefix(brandLogo)}`}
						alt='brand name'
						height={50}
						width={50}
						className='rounded-full'
					/>
					<Avatar
						modelSrc={url}
						cameraInitialDistance={0.85}
						className='relative left-4 -top-4'
					/>
					<Link
						href={`https://discover.myriadflow.com/nfts/${name}`}
						className={`rounded-md border py-1 px-4 bg-[#DF1FDD] text-white border-black cursor-pointer `}
						target='_blank'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<button
							className={`bg-transparent border-0 size-full items-center gap-1 transition-all duration-300 overflow-hidden ${
								isHovered ? 'flex' : ''
							}`}
						>
							<span>Discover</span>
							{isHovered && (
								<motion.span
									initial={{ y: 100 }}
									animate={{ y: 0 }}
									transition={{ duration: 0.25 }}
									className='overflow-hidden'
								>
									<svg
										width='13'
										height='13'
										viewBox='0 0 13 13'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12.75 0.999999C12.75 0.585786 12.4142 0.25 12 0.249999L5.25 0.25C4.83579 0.25 4.5 0.585786 4.5 1C4.5 1.41421 4.83579 1.75 5.25 1.75L11.25 1.75L11.25 7.75C11.25 8.16421 11.5858 8.5 12 8.5C12.4142 8.5 12.75 8.16421 12.75 7.75L12.75 0.999999ZM1.53033 12.5303L12.5303 1.53033L11.4697 0.469669L0.46967 11.4697L1.53033 12.5303Z'
											fill='white'
										/>
									</svg>
								</motion.span>
							)}
						</button>
					</Link>
				</div>

				<div className='flex relative gap-4 items-end text-white'>
					{/* <Ellipsis className='absolute top-1 right-1'/> */}
					<Image
						src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
							phygitalImage
						)}`}
						alt={phygitalId}
						height={65}
						width={65}
						className='rounded-md'
					/>
					<div className='flex flex-col justify-between h-full'>
						<h2 className='text-base font-semibold'>{phygitalId}</h2>
						<Link
							href={`https://webxr.myriadflow.com/${name}`}
							className='bg-cyan-400 text-base border-black rounded-md text-black border cursor-pointer py-1 px-4'
							target='_blank'
							onMouseEnter={() => setIsExpHovered(true)}
							onMouseLeave={() => setIsExpHovered(false)}
						>
							<button
								className={`bg-transparent border-0 size-full items-center gap-1 transition-all duration-300 overflow-hidden ${
									isExpHovered ? 'flex' : ''
								}`}
							>
								<span>Experience</span>
								{isExpHovered && (
									<motion.span
										initial={{ y: 100 }}
										animate={{ y: 0 }}
										transition={{ duration: 0.35 }}
										className='overflow-hidden'
									>
										<svg
											width='13'
											height='13'
											viewBox='0 0 13 13'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M12.75 0.999999C12.75 0.585786 12.4142 0.25 12 0.249999L5.25 0.25C4.83579 0.25 4.5 0.585786 4.5 1C4.5 1.41421 4.83579 1.75 5.25 1.75L11.25 1.75L11.25 7.75C11.25 8.16421 11.5858 8.5 12 8.5C12.4142 8.5 12.75 8.16421 12.75 7.75L12.75 0.999999ZM1.53033 12.5303L12.5303 1.53033L11.4697 0.469669L0.46967 11.4697L1.53033 12.5303Z'
												fill='black'
											/>
										</svg>
									</motion.span>
								)}
							</button>
						</Link>
					</div>
					<Link
						href={`https://discover.myriadflow.com/nfts/${name}`}
						target='_blank'
						className='cursor-pointer basis-1/4'
					>
						<Image src={'/cart.png'} alt='cart' height={35} width={35} />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AvatarCard
