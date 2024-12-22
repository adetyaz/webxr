'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { BadgeInfo, Menu } from 'lucide-react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import Image from 'next/image'

const Header = ({
	home,
	onClick,
	userType,
	showAttestation,
}: {
	home: boolean
	onClick?: React.ReactEventHandler
	userType?: string
	showAttestation?: () => void
}) => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const { address } = useAccount()
	const { disconnect } = useDisconnect()
	const pathname = usePathname()
	const [name, setName] = useState('')
	const [profileImage, setProfileImage] = useState('')
	const [username, setUserName] = useState('')
	const menuRef = useRef<HTMLDivElement>(null)

	const wallet = useWallet()
	const { publicKey, connected } = wallet
	const connection = new Connection(clusterApiUrl('devnet'))
	const metaplex = useMemo(() => {
		if (wallet) {
			return new Metaplex(connection).use(walletAdapterIdentity(wallet))
		}
	}, [wallet, connection])

	const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

	useEffect(() => {
		const getUserData = async () => {
			if (address) {
				try {
					const response = await fetch(
						`${baseUri}/profiles/wallet/${address}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)

					if (response.ok) {
						const data = await response.json()
						setProfileImage(data.profile_image)
						setUserName(data.username)
						setName(data.name)
					} else {
						console.log('No user found')
					}
				} catch (error) {
					console.error('Error fetching user data', error)
				}
			}
		}
		getUserData()
	}, [address])

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef?.current?.contains(event.target as Node)
			) {
				setIsDropdownOpen(false)
				setIsProfileMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const Notification = () => {
		if (!address) {
			toast.warning(
				'Currently works with Metamask and Coinbase Wallet Extension. We are working on Smart Wallet functionality.',
				{
					containerId: 'containerA',
					position: 'top-left',
				}
			)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('walletAddress')
		disconnect()
	}

	const getLinkColor = (path: any) => {
		return pathname === path ? '#000' : isScrolled ? 'white' : 'black'
	}

	return (
		<>
			<div
				className={`fixed top-0 w-full py-4 transition-all duration-300 ease-in-out
					${isScrolled ? 'bg-white' : 'bg-transparent'} 
					${home ? 'bg-gradient-to-r' : 'bg-transparent'} 
				text-white
				z-20`}
				style={
					home
						? {
								backgroundImage:
									'linear-gradient(to right, #FFFFFFBA, #30D8FF, #DF1FDD)',
						  }
						: undefined
				}
			>
				<div className='container mx-auto flex justify-between items-center'>
					<a href='/' className='flex items-center'>
						<img
							src={'/logo.png'}
							height={128}
							width={128}
							className='w-32 md:w-48'
							alt='Logo'
						/>
					</a>
					<div
						className={`items-center space-x-8 text-lg font-bold hidden ${
							!home ? 'hidden' : 'sm:flex'
						}`}
					>
						<Link href='https://studio.myriadflow.com'>Studio</Link>
						<Link href='https://discover.myriadflow.com'>Discover</Link>
						<Link href='/' style={{ color: getLinkColor('/') }}>
							WebXR
						</Link>
						<Link
							href='https://myriadflow.com'
							className='flex cursor-pointer items-center gap-2'
						>
							<span>Home</span>
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
						</Link>
					</div>
					<div className='flex gap-4 items-center'>
						<div className='flex items-center space-x-4'>
							{address ? (
								<>
									<div className='relative'>
										<button
											onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
											className='focus:outline-none'
										>
											<Image
												src={
													profileImage
														? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
														: '/profile.png'
												}
												alt='Profile'
												height={40}
												width={40}
												className='w-10 h-10 rounded-full'
											/>
										</button>
										{isProfileMenuOpen && (
											<div className='absolute sm:right-0 mt-2 p-2 sm:p-4 bg-white text-black rounded-lg shadow-lg w-64'>
												<div className='flex items-center mb-4'>
													<Image
														src={
															profileImage
																? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
																: '/profile.png'
														}
														height={40}
														width={40}
														alt='Profile'
														className='w-10 h-10 rounded-full mr-2'
													/>
													<div>
														<span className='block text-sm font-semibold'>
															{name}
														</span>
														<Link
															href={`https://discover.myriadflow.com/${username}`}
															className='text-xs text-gray-500 hover:underline'
														>
															View profile
														</Link>
													</div>
												</div>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													My assets
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													On sale
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													My brands
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													My collections
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Activity
												</Link>
												<Link
													href={`https://discover.myriadflow.com/${username}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Rewards
												</Link>
												<Link
													href='https://studio.myriadflow.com'
													target='_blank'
													rel='noopener noreferrer'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Create
												</Link>
												<Link
													href='https://discover.myriadflow.com/profile-setting'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
												>
													Profile Settings
												</Link>
												<div className='border-t border-gray-200 my-2'></div>
												<button
													onClick={handleLogout}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left'
												>
													Log out
												</button>
												<div className='mt-2 flex items-center justify-between px-4 py-2 text-xs text-gray-500'>
													<span className='flex-1 truncate'>{address}</span>
													<button
														onClick={() => {
															navigator.clipboard
																.writeText(address)
																.then(() => {
																	alert('Address copied to clipboard!')
																})
																.catch((err) => {
																	console.error('Failed to copy address:', err)
																})
														}}
														className='ml-2 text-blue-500 hover:text-blue-700'
													>
														Copy
													</button>
												</div>
											</div>
										)}
									</div>
								</>
							) : (
								<button onClick={Notification} className='text-xl'>
									<WalletMultiButton />
								</button>
							)}
						</div>
						<button
							className='sm:hidden text-2xl'
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<Menu />
						</button>
						{!home && (
							<BadgeInfo
								className='cursor-pointer md:hidden'
								onClick={onClick}
							/>
						)}
						{userType === 'owner' && (
							<div onClick={showAttestation} className='cursor-pointer'>
								<Image src='/receipt.png' alt='Create' width={38} height={38} />
							</div>
						)}
					</div>
				</div>
				{isDropdownOpen && (
					<div
						ref={menuRef}
						className='sm:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-40'
					>
						<div className='flex flex-col items-center justify-center h-full bg-white text-black relative'>
							<button
								onClick={() => setIsDropdownOpen(false)}
								className='absolute top-4 right-4 text-xl text-gray-700'
							>
								<Image
									src='/close.png'
									alt='Close'
									height={48}
									width={48}
									className='w-12 h-12'
								/>
							</button>
							<Link
								href='https://myriadflow.com'
								style={{ color: getLinkColor('/') }}
								className='block py-2 text-lg'
							>
								Home
							</Link>
							<Link
								href='https://studio.myriadflow.com'
								style={{ color: getLinkColor('https://studio.myriadflow.com') }}
							>
								Studio
							</Link>
							<Link
								href='https://discover.myriadflow.com'
								style={{
									color: getLinkColor('https://discover.myriadflow.com'),
								}}
							>
								Discover
							</Link>

							<Link href='/' style={{ color: getLinkColor('/') }}>
								WebXR
							</Link>
						</div>
					</div>
				)}
			</div>
			<ToastContainer
				className='absolute top-0 right-0'
				containerId='containerA'
			/>
		</>
	)
}

export default Header
