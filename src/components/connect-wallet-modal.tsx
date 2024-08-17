import { ConnectWallet } from './connect-wallet'

export const ConnectWalletModal = () => {
	return (
		<div className='py-4 rounded-lg shadow-md bg-white'>
			<div className='text-center font-semibold text-lg'>
				Connect wallet to claim NFT and <br /> unlock the experience
			</div>

			<div className='flex items-center justify-center py-4'>
				<ConnectWallet />
			</div>
		</div>
	)
}
