'use client'
import Image from 'next/image'
import Link from 'next/link'

import LeaderBoard from '@/components/leaderboard'

import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import { ConnectWallet } from '@/components/connect-wallet'

export default function Home() {
	const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development'

	const apiUrl = isDevelopment
		? 'http://localhost:3000' // Local development URL
		: 'https://discover-two.vercel.app' // Production URL

	const [brands, setBrands] = useState([])
	const [phygitals, setPhygitals] = useState<any>([])
	const [collections, setCollections] = useState<any>([])
	const [loading, setLoading] = useState(false)

	const getBrands = async () => {
		try {
			setLoading(true)

			const baseUri =
				process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

			const res = await fetch(`${baseUri}/brands/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const phyres = await fetch(`${baseUri}/phygitals/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const collres = await fetch(`${baseUri}/collections/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!res.ok || !phyres.ok || !collres.ok) {
				throw new Error('Failed to fetch data')
			}

			const result = await res.json()
			const phyresult = await phyres.json()
			const collresult = await collres.json()

			console.log(phyresult)

			setBrands(result)
			setPhygitals(phyresult)
			setCollections(collresult)

			setLoading(false)

			//   console.log("new database output", result, phyresult, collresult);
		} catch (error) {
			console.error('Error fetching data:', error)
			setLoading(false)
		}
	}

	useEffect(() => {
		getBrands()
	}, [])

	const exploreButtonStyle = {
		padding: '10px 40px',
		fontSize: '1rem',
		fontWeight: 'bold',
		color: 'white',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		backgroundImage: 'url("./Rectangle 12.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Add box-shadow for a better visual effect
	}

	return (
		<div className='bg-black'>
			<div
				className='px-10'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					background:
						'linear-gradient(90deg, #FDF4F5, #00A9FF, #604CC3, #FF55BB)',
					paddingBottom: '10px',
				}}
			>
				<div className='mt-4'>
					<img src='/logo.png' style={{ width: '200px' }} alt='Logo' />
				</div>
				<div
					style={{
						display: 'flex',
						gap: '40px',
						fontSize: '20px',
						color: 'white',
					}}
					className='mt-6'
				>
					<Link href='https://myriadflow.com' target='_blank'>
						Home
					</Link>
					<Link href='https://discover-two.vercel.app' target='_blank'>
						Discover
					</Link>
					<Link href='https://studio-one-sigma.vercel.app' target='_blank'>
						Studio
					</Link>
					<Link href='https://webxr-3d.vercel.app' target='_blank'>
						WebXR
					</Link>
				</div>
				<div className='mt-6'>
					<ConnectWallet />
				</div>
			</div>
			<div className='flex h-screen bg-white'>
				<div className='w-1/2 h-full px-16 flex flex-col justify-center'>
					<div className='text-7xl font-bold'>WebXR</div>
					<div className='text-6xl font-semibold mt-6'>
						Experience & Interact
					</div>
					<div className='text-2xl mt-10'>
						Interact with unique AI-powered brand ambassadors.
					</div>
					<div className='flex gap-10 mt-10'>
						<button
							className='border'
							style={{
								background: 'transparent',
								border: '6px solid transparent',
								borderRadius: '8px',
								backgroundImage: `
    linear-gradient(white, white),
    linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
  `,
								backgroundOrigin: 'border-box',
								backgroundClip: 'content-box, border-box',
								WebkitBackgroundClip: 'content-box, border-box', // For Safari
								display: 'block',
								width: '180px',
								height: '50px',
							}}
						>
							<ConnectWallet />
						</button>
					</div>
				</div>

				<div
					className='w-1/2'
					style={{ marginTop: '200px', marginLeft: '50px' }}
				>
					<iframe
						width='560'
						height='315'
						src={`https://www.youtube.com/embed/5rMei4ShcHU?autoplay=1`}
						frameBorder='0'
						allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>
			</div>

			<div className='pt-20 bg-white'>
				<LeaderBoard />
			</div>

			<div className='bg-white pt-20'>
				<Footer />
			</div>

			{loading && (
				<div
					style={{
						//   backgroundColor: "#222944E5",
						display: 'flex',
						overflowY: 'auto',
						overflowX: 'hidden',
						position: 'fixed',
						inset: 0,
						zIndex: 50,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						maxHeight: '100%',
					}}
					id='popupmodal'
				>
					<div
						style={{
							position: 'relative',
							padding: '1rem',
							width: '100%',
							maxHeight: '100%',
						}}
					>
						<div style={{ position: 'relative' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									gap: '1rem',
								}}
							>
								<img
									src='https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif'
									alt='Loading icon'
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
