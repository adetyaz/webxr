import Image from 'next/image'
import React from 'react'

export const InfoCard = ({ phygital }: any) => {
	const removePrefix = (uri: any) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<div className='p-8 bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-lg size-80'>
			<div className='flex items-center gap-8'>
				<h3>{phygital ? phygital.name : 'Phygital name'}</h3>
				<Image
					src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
						phygital.image
					)}`}
					// src={'/Vector.png'}
					alt='placeholder'
					height={80}
					width={80}
				/>
			</div>
			<div>
				<div className='flex gap-4'>
					<h3>Phygital Description</h3>:
					<p className='truncate'>{phygital.description}</p>
				</div>

				<div className='flex gap-4'>
					<h3>By</h3>:<p>{phygital.brand_name}</p>
				</div>
				<div className='flex gap-4'>
					<h3>price</h3>:<p>{phygital.price}</p>
				</div>
			</div>
			<button className=' py-3 bg-[#30D8FF] rounded-lg mt-4 mx-auto w-full'>
				View on Discover
			</button>
		</div>
	)
}
