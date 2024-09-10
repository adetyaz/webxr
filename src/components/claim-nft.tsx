'use client'
import Link from 'next/link'
import { ClaimNftModal } from './claim-nft-modal'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { simulateContract, writeContract } from '@wagmi/core'
import { useState } from 'react'

import { ConnectWallet } from './connect-wallet'
import { config } from '@/lib/wagmi'
import reward from '@/lib/reward.json'
import mainAbi from '@/lib/mainnetAbi.json'
import { useQuery } from '@tanstack/react-query'
import { getBrands } from '@/utils/queries'
import { BrandType } from '@/types/types'

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

	const brand = useQuery({
		queryKey: ['brand'],
		queryFn: async () => {
			const brandId = await getBrands()
			return brandId.find((brand: BrandType) => brand.name === brandName)
		},
	})

	const brandResult = brand.data

	const createFanToken = async () => {
		// const abi = reward.abi
		// const { request } = await simulateContract(config, {
		// 	abi,
		// 	address: '0x7Bc52aEd144B3262c17442e5223113C2f29a7033',
		// 	// address: '0x771C15e87272d6A57900f009Cd833b38dd7869e5'
		// 	functionName: 'createFanToken',
		// 	args: [String(contractAddress), 1, '0x0', 'www.xyz.com'],
		// })
		// const hash = await writeContract(config, request)
		// console.log('HASH', hash)

		const response = await fetch(`${baseUri}/create-fan-token`, {
			method: 'POST',
			body: JSON.stringify({
				nftContractAddress: contractAddress,
				amount: '1',
				data: '0x0',
				uri: 'www.xyz.com',
			}),
		})

		const hash = await response.json()

		if (hash) {
			const res = await fetch(`${baseUri}/fantoken`, {
				method: 'POST',
				body: JSON.stringify({
					brand_id: brandResult.id,
					collection_id: collectionId,
					phygital_id: phygitalId,
					phygital_name: phygitalName,
					chaintype_id: chainTypeId,
					fantoken_id: hash.txHash,
					wallet_address: account.address,
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
								height={50}
								width={150}
							/>

							<Image
								src={`https://nftstorage.link/ipfs/${removePrefix(freeNft)}`}
								alt='Free NFT Image'
								height={80}
								width={120}
								className='mt-16'
							/>
							<Image
								src='/trophy1.png'
								alt='trophy image'
								height={50}
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
