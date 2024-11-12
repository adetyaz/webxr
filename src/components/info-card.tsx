import { PhygitalType } from '@/types/types'
import { removePrefix } from '@/utils/helper'
import Image from 'next/image'
import Link from 'next/link'

export const InfoCard = ({ phygital }: any) => {
	function truncateString(str: string, length: number = 90): string {
		if (str?.length <= length) {
			return str
		}
		return str?.slice(0, length) + '...'
	}

	const reversedId = phygital.name.toLowerCase().replace(/\s+/g, '-')

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
				<div>
					<p className='text-ellipsis text-base'>
						{!phygital.description
							? 'loading'
							: truncateString(phygital?.description)}
					</p>
				</div>

				<div className='flex gap-4 mt-4'>
					<h3>By:</h3>
					<p>{phygital.brand_name}</p>
				</div>
			</div>
			<Link
				href={`https://discover.myriadflow.com/nfts/${reversedId}`}
				target='_blank'
			>
				<button className=' py-3 bg-[#30D8FF] rounded-lg mt-4 mx-auto w-full'>
					View on Discover
				</button>
			</Link>
		</div>
	)
}
