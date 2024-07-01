'use client'
import Link from 'next/link'
import { ClaimNftPopUp } from './claim-nft-popup'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import { useCapabilities, useWriteContracts } from 'wagmi/experimental'
import { useMemo, useState } from 'react'

import { myNFTABI, myNFTAddress } from '../utils/myNFT'
import { CreateWallet } from './create-wallet'

export const ClaimNft = ({ onClose, freeNft, brandName }) => {
	const [claimNft, setClaimNft] = useState(false)
	const account = useAccount()

	const [id, setId] = useState(undefined)

	const { writeContracts } = useWriteContracts({
		mutation: { onSuccess: (id) => setId(id) },
	})
	const { data: availableCapabilities } = useCapabilities({
		account: account.address,
	})
	const capabilities = useMemo(() => {
		if (!availableCapabilities || !account.chainId) return {}
		const capabilitiesForChain = availableCapabilities[account.chainId]
		if (
			capabilitiesForChain['paymasterService'] &&
			capabilitiesForChain['paymasterService'].supported
		) {
			return {
				paymasterService: {
					url: `http://localhost:3002/api/paymaster`,
				},
			}
		}
		return {}
	}, [availableCapabilities, account.chainId])

	const removePrefix = (uri) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<div>
			<ToastContainer />
			{!claimNft ? (
				<div
					style={{
						//   backgroundColor: "#FFFFFFB2",
						display: 'flex',
						overflowY: 'auto',
						overflowX: 'hidden',
						position: 'fixed',
						inset: 0,
						zIndex: 50,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						maxHeight: 'fit-content',
					}}
					id='popupmodal'
				>
					<div
						style={{
							position: 'relative',
							padding: '16px',
							width: '100%',
							maxWidth: '50rem',
							maxHeight: '100%',
						}}
					>
						<div
							style={{
								position: 'relative',
								borderRadius: '0.5rem',
								boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)',
								color: 'black',
								background: 'white',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									padding: '16px',
									borderRadius: '20px',
									borderColor: '#4B5563',
								}}
							>
								{/* Add any additional content or buttons here */}
							</div>

							<div style={{ padding: '16px', spaceY: '16px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<p
										style={{
											backgroundImage:
												'linear-gradient(90deg, #30D8FF, #5B0292)',
											WebkitBackgroundClip: 'text',
											backgroundClip: 'text',
											color: 'transparent',
											// paddingTop: "60px",
											fontSize: '2.5rem',
											textAlign: 'center',
											fontWeight: 'bold',
										}}
									>
										Congratulations!
									</p>
								</div>

								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<img src='./trophy2.png' />

									<Image
										src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
											freeNft
										)}`}
										alt='Free NFT Image'
										height={80}
										width={150}
										style={{ marginTop: '60px' }}
									/>
									<img src='./trophy1.png' />
								</div>

								<p
									style={{
										fontSize: '1.2rem',
										textAlign: 'center',
										padding: '40px',
									}}
								>
									You are eligible to claim a free NFT fan token to show your
									support to {brandName} and get a chance to earn weekly
									rewards.
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									paddingBottom: '60px',
								}}
							>
								<Link
									href=''
									type='button'
									style={{
										width: '30%',
										marginLeft: 'auto',
										marginRight: 'auto',
										color: 'black',
										focusRing: '4px',
										outline: 'none',
										borderRadius: '30rem',
										fontSize: '1.2rem',
										padding: '10px 0px',
										textAlign: 'center',
										backgroundColor: '#30D8FF',
									}}
									onClick={() => {
										if (!account.address) {
											toast.warning('Connect or Create a wallet')
										} else {
											setTimeout(() => {
												setClaimNft(true)
											}, 10000)
											writeContracts({
												contracts: [
													{
														address: myNFTAddress,
														abi: myNFTABI,
														functionName: 'safeMint',
														args: [account.address],
													},
												],
												capabilities,
											})
										}
									}}
								>
									Claim Free NFT
								</Link>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingBottom: '2rem',
									marginInline: 'auto',
								}}
							>
								{!account.address && <CreateWallet />}
							</div>
						</div>
					</div>
				</div>
			) : (
				<ClaimNftPopUp
					onClose={onClose}
					brandName={brandName}
					freeNft={freeNft}
				/>
			)}
		</div>
	)
}
