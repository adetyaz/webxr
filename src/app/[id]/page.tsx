'use client'
import { InfoCard } from '@/components/info-card'
import Image from 'next/image'
import { Avatar } from '@readyplayerme/visage'
import { useAccount, useChainId, useConnect } from 'wagmi'
import { useEffect, useState } from 'react'
import { ClaimNft } from '@/components/claim-nft'
import { toast } from 'react-toastify'
import { VoiceAssistant } from '@/components/voice-assistant'
import { useQueries } from '@tanstack/react-query'
import { baseURI, getAvatars, getPhygital, getWebXR } from '@/utils/queries'
import { AvatarType } from '@/types/types'
import Header from '@/components/header'
import Moralis from 'moralis'

export default function Home({ params }: { params: { id: string } }) {
	const { id } = params
	const [unlockClaimed, setUnlockClaimed] = useState(false)
	const [showCard, setShowCard] = useState(false)
	const [mintedNFTs, setMintedNFTs] = useState([])
	const [userType, setUserType] = useState('guest')

	const { address } = useAccount()

	const chainId = useChainId()
	const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY

	const results = useQueries({
		queries: [
			{
				queryKey: ['phygital'],
				queryFn: () => getPhygital(id),
			},
			{
				queryKey: ['webxr'],
				queryFn: () => getWebXR(id),
			},
			{
				queryKey: ['avatar'],
				queryFn: async () => {
					const avatars = await getAvatars()
					return avatars.find((avatar: AvatarType) => avatar.phygital_id === id)
				},
			},
		],
	})

	const [phygitalResult, webxrResult, avatarResult] = results

	useEffect(() => {
		const fetchNFTs = async () => {
			try {
				await Moralis.start({ apiKey })

				const assets = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: chainId,
					format: 'decimal',
					mediaItems: false,
					address: '0x99BD4BDD7A9c22E2a35F09A6Bd17f038D5E5eB87',
				})

				//@ts-ignore
				setMintedNFTs(assets?.raw?.result)

				// console.log('NFTs:', assets.raw.result)
				// console.log('Contract Address: ', phygitalResult.data?.contract_address)
				// console.log(
				// 	'Token Addresses: ',
				// 	assets.raw.result.map((nft) => nft.token_address)
				// )

				if (assets?.raw?.result && phygitalResult?.data?.contract_address) {
					const result = assets.raw.result.find(
						(nft) => nft.token_address === phygitalResult.data.contract_address
					)
					console.log(result)
					setUserType('owner')
				} else {
					console.log('No matching data or contract address is undefined')
				}
			} catch (e) {
				console.error(e)
			}
		}

		if (address && chainId) {
			fetchNFTs()
		}
	}, [address])

	useEffect(() => {
		//@ts-ignore
		if (address && !mintedNFTs && !mintedNFTs[0]?.token_hash) {
			setTimeout(() => {
				setUnlockClaimed(true)
			}, 60000)
		}
	}, [mintedNFTs, address])

	const closeClaimed = () => {
		setUnlockClaimed(false)
	}

	const removePrefix = (uri: any) => {
		return uri?.substring(7, uri.length)
	}

	if (
		phygitalResult.isLoading ||
		webxrResult.isLoading ||
		avatarResult.isLoading
	)
		return (
			<div className='h-screen flex flex-col justify-center items-center'>
				<Image src={'/spinner.svg'} alt='loading' height={120} width={120} />
			</div>
		)

	if (phygitalResult.isError || webxrResult.isError || avatarResult.isError)
		return toast.error('Error fetching data')

	const phygital = phygitalResult.data
	const webxr = webxrResult.data
	const avatar = avatarResult.data

	// console.log(phygital)

	return (
		<main className='flex h-dvh flex-col items-center justify-between p-24 relative'>
			<Header home={false} onClick={() => setShowCard(!showCard)} />

			<a-scene>
				<a-sky
					src={
						webxr.image360 !== 'undefined' &&
						`${'https://nftstorage.link/ipfs'}/${removePrefix(webxr.image360)}`
					}
					rotation='0 -130 0'
				></a-sky>
			</a-scene>

			<section>
				{showCard && (
					<div className='z-10 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2'>
						<InfoCard phygital={phygital} />
					</div>
				)}

				<div className='hidden md:block absolute right-2 bottom-8'>
					<InfoCard phygital={phygital} />
				</div>
				<div className='absolute transform -translate-x-1/2 text-white bottom-2'>
					<VoiceAssistant
						productInfo={phygital}
						brandName={phygital.brand_name}
						voice={avatar.avatar_voice}
						userType={userType}
					/>
				</div>
				<div className='absolute transform -translate-x-1/2  md:-translate-x-0 md:left-4 bottom-48 md:bottom-16 h-3/5 md:h-3/4'>
					<Avatar modelSrc={avatar && avatar.url} cameraInitialDistance={3.5} />
					<button className='hidden border-2 border-white text-white bg-black mx-auto md:block bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'>
						{address ? 'Customize' : 'Unlock'}
					</button>
				</div>
				{/* {!account.address && (
					<div className='modal w-2/6'>
						<ConnectWalletModal />
					</div>
				)}
			 */}
				{/* <div className='modal'>
					<MintedModal
						onClose={closeCongratulations}
						phygitalName={phygital.name}
					/>
				</div> */}

				{unlockClaimed && (
					<div className='modal w-[95%] sm:w-5/6 md:w-3/6'>
						<ClaimNft
							onClose={closeClaimed}
							freeNft={webxr.free_nft_image}
							brandName={phygital.brand_name}
							contractAddress={phygital.contract_address}
						/>
					</div>
				)}
			</section>
		</main>
	)
}
