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
import { AvatarType, PhygitalType } from '@/types/types'
import Header from '@/components/header'
import Moralis from 'moralis'
import { ProvenanceAttestation } from '@/components/provenance-attestation'


export default function Home({ params }: { params: { id: string } }) {
	const { id } = params
	const [unlockClaimed, setUnlockClaimed] = useState(false)
	const [showCard, setShowCard] = useState(false)
	const [mintedNFTs, setMintedNFTs] = useState<any[]>([])
	const [userType, setUserType] = useState('guest')
	const [showProvenance, setShowProvenance] = useState(false)
	const [notClaimed, setNotClaimed] = useState(false)
	

	const { address } = useAccount()

	const chainId = useChainId()
	const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY

	const results = useQueries({
		queries: [
			{
				queryKey: ['phygital', id],
				queryFn: () => getPhygital(id),
				staleTime: 1000 * 60 * 5,
				retry: 3,
			},
			{
				queryKey: ['webxr', id],
				queryFn: () => getWebXR(id),
				staleTime: 1000 * 60 * 5,
				retry: 3,
			},
			{
				queryKey: ['avatar', id],
				queryFn: async () => {
					const avatars = await getAvatars()
					return avatars.find((avatar: AvatarType) => avatar.phygital_id === id)
				},
				staleTime: 1000 * 60 * 5,
				retry: 3,
			},
		],
	})

	const [phygitalResult, webxrResult, avatarResult] = results

	useEffect(() => {
		// console.log(phygitalResult.data)
		if (address && chainId && phygitalResult.data) {
			fetchNFTs(phygitalResult.data)
		}

	}, [phygitalResult, address, chainId])


	const fetchNFTs = async (data: PhygitalType) => {

		const phygitalAddress = data.contract_address

		try {
			await Moralis.start({ apiKey })

			const assets = await Moralis.EvmApi.nft.getWalletNFTs({
				chain: chainId,
				format: 'decimal',
				mediaItems: false,
				address: address!,
			})

			setMintedNFTs(assets?.raw?.result || [])
			// console.log(assets?.raw?.result)
			if (assets?.raw?.result && phygitalAddress) {
				const erc721Match = assets.raw.result.some(
					(nft) => 
						nft.token_address.toLowerCase() === phygitalAddress.toLowerCase() &&
						nft.contract_type.toLowerCase() === 'erc721'
				)

				const erc1155Match = assets.raw.result.some(
					(nft) => 
						nft.token_address.toLowerCase() === phygitalAddress.toLowerCase() &&
						nft.contract_type.toLowerCase() === 'erc1155'
				)

				if (erc721Match) {
					setUserType('owner')
					setNotClaimed(false)
				} else if (erc1155Match) {
					setUserType('guest')
					setNotClaimed(false)  // Has token but as ERC1155
				} else {
					setUserType('guest')
					setNotClaimed(true)   // No matching token at all
				}

			} else {
				console.log('No matching data or contract address is undefined')
				if (assets?.raw?.result?.length === 0) {
					setNotClaimed(true)
					setUserType('guest')
				}
			}
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		// Only start timer if user is connected and hasn't claimed
		if (address && notClaimed) {
			const timer = setTimeout(() => {
				setUnlockClaimed(true)
			}, 60000)

			// Cleanup timer if component unmounts or conditions change
			return () => clearTimeout(timer)
		}
	}, [address, notClaimed]) // Dependencies now include notClaimed

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


	return (
		<main className='flex h-dvh flex-col items-center justify-between p-24 relative'>
			<Header home={false} onClick={() => setShowCard(!showCard)} userType={userType} showAttestation={() => setShowProvenance(true)} />

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
				{userType === 'owner' && showProvenance &&
					<div className='fixed inset-0 bg-white backdrop-blur-sm z-50 flex items-center justify-center'
						style={{
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							WebkitBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							MozBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						}}>
						<div className='z-10 md:w-[60%] top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 h-[85%] overflow-y-scroll border border-black'>
							<ProvenanceAttestation phygital={phygital} avatarModel={avatar && avatar.url} showAttestation={() => setShowProvenance(false)} />
						</div>
					</div>

				}
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
