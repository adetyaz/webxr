'use client'
import Link from 'next/link'
import { ClaimNftModal } from './claim-nft-modal'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { simulateContract, writeContract } from '@wagmi/core'
import { useState } from 'react'
import { X } from 'lucide-react'
import { ConnectWallet } from './connect-wallet'
import { config } from '@/lib/wagmi'
import reward from '@/lib/reward.json'

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

export const ClaimNft = ({
	onClose,
	freeNft,
	brandName,
	contractAddress,
	chainTypeId,
	collectionId,
	phygitalName,
	phygitalId,
}: {
	onClose: (state: boolean) => void
	freeNft: string
	brandName: string
	contractAddress: string
	chainTypeId: string
	collectionId: string
	phygitalName: string
	phygitalId: string
}) => {
	const [claimNft, setClaimNft] = useState(false)
	const [brandId, setBrandId] = useState('')
	const account = useAccount()

	const handleClick = () => {
		onClose(false)
	}

	const createFanToken = async () => {
		const abi = reward.abi
		const { request } = await simulateContract(config, {
			abi,

			address: '0x771C15e87272d6A57900f009Cd833b38dd7869e5',
			functionName: 'createFanToken',
			args: [String(contractAddress), 1, 1, '0x0', 'www.xyz.com'],
		})
		const hash = await writeContract(config, request)

		if (hash) {
			const res = await fetch(`${baseUri}/fantoken`, {
				method: 'POST',
				body: JSON.stringify({
					brand_id: brandId,
					collection_id: collectionId,
					phygital_id: phygitalId,
					phygital_name: phygitalName,
					chaintype_id: chainTypeId,
					fan_token_id: hash,
				}),
			})

			const result = await res.json()

			if (result) {
				setClaimNft(true)
			}
		}
	}

	const removePrefix = (uri: string) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<>
			{!claimNft ? (
				<div className='relative bg-white p-4 text-black rounded-lg shadow-md'>
					<div className='flex items-center justify-end '>
						<X color='#000' className='cursor-pointer' onClick={handleClick} />
					</div>

					<div className='p-4 space-y-4'>
						<div className='flex justify-around'>
							<p className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-900 text-center'>
								Congratulations!
							</p>
						</div>

						<div className='flex justify-around'>
							<Image
								src='/trophy2.png'
								alt='trophy image'
								height={100}
								width={150}
							/>

							<Image
								src={`https://nftstorage.link/ipfs/${removePrefix(freeNft)}`}
								alt='Free NFT Image'
								height={80}
								width={150}
								className='mt-16'
							/>
							<Image
								src='/trophy1.png'
								alt='trophy image'
								height={100}
								width={150}
							/>
						</div>

						<p className='text-lg text-center px-10 py-4'>
							You are eligible to claim a free NFT fan token to show your
							support to {brandName} and get a chance to earn weekly rewards.
						</p>
					</div>

					<div className='flex items-center pb-4'>
						<button
							className='w-1/3 mx-auto text-black focus:ring-4 outline-none rounded-full text-lg py-1 text-center bg-blue-400'
							onClick={() => {
								if (!account.address) {
									toast.warning('Connect or Create a wallet')
								} else {
									createFanToken()
								}
							}}
						>
							Claim Free NFT
						</button>
					</div>

					<div className='flex justify-center pb-4 mx-auto'>
						{!account.address && <ConnectWallet />}
					</div>
				</div>
			) : (
				<ClaimNftModal
					onClose={onClose}
					brandName={brandName}
					freeNft={freeNft}
				/>
			)}
		</>
	)
}
