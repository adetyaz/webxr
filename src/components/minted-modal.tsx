import Image from 'next/image'

export const MintedModal = ({
	onClose,
	phygitalName,
}: {
	onClose: (state: boolean) => void
	phygitalName: string
}) => {
	const handleClick = () => {
		onClose(false)
	}

	return (
		<div className='p-4 rounded-lg shadow-md bg-white'>
			<div>
				<div className='flex justify-between items-center'>
					<Image src='/trophy2.png' alt='trophy' height={100} width={100} />
					<p className='text-center font-bold text-4xl text-transparent bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text'>
						Congratulations!
					</p>
					<Image src='/trophy1.png' alt='trophy' height={100} width={100} />
				</div>
				<p className='text-center text-lg'>
					You have successfully minted {phygitalName} phygital NFT!
				</p>
				<p className='text-center font-semibold text-lg'>
					As the owner of {phygitalName} you are also the owner of this avatar!
				</p>
				<p className='text-center text-lg px-4'>
					You can customize the avatar and get a chance to compete against other
					avatars for weekly rewards on MyriadFlow leaderboard.
				</p>
			</div>

			<div className='flex items-center justify-center py-4'>
				<button className='w-2/5 mx-auto text-black focus:outline-none rounded-full py-2 text-center bg-blue-500'>
					View in my assets
				</button>

				<button
					className='w-2/5 mx-auto text-black focus:outline-none rounded-full py-2 text-center border border-purple-500'
					onClick={handleClick}
				>
					Continue Experience
				</button>
			</div>
		</div>
	)
}
