'use client'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { getDefaultConfig, connectorsForWallets } from '@rainbow-me/rainbowkit'
// import { coinbaseWallet } from 'wagmi/connectors'
import { cookieStorage, createStorage, createConfig, http } from 'wagmi'
import { createClient } from 'viem'
import { baseSepolia } from 'wagmi/chains'
import {
	rainbowWallet,
	walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets'

// Enable Coinbase Smart Wallet for testing
coinbaseWallet.preference = 'smartWalletOnly'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
	name: 'Myriadflow WebXR',
	description: 'Myriadflow WebXR Experience',
	url: 'https://web3modal.com',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// Create wagmiConfig
const chains = [baseSepolia] as const
// export const config = defaultWagmiConfig({
// 	chains,
// 	projectId,
// 	metadata,
// 	connectors: [
// 		coinbaseWallet({
// 			preference: 'smartWalletOnly',
// 		}),
// 	],
// 	ssr: false,
// 	storage: createStorage({
// 		storage: cookieStorage,
// 	}),
// })

const connectors = connectorsForWallets(
	[
		{
			groupName: 'Recommended',
			wallets: [rainbowWallet, coinbaseWallet, walletConnectWallet],
		},
	],
	{
		appName: 'Myriadflow WebXR',
		projectId: projectId,
	}
)

export const rainbowconfig = createConfig({
	connectors,

	chains: [baseSepolia],
	ssr: true, // If your dApp uses server side rendering (SSR)
	client({ chain }) {
		return createClient({ chain, transport: http() })
	},
	// storage: createStorage({
	// 	storage: cookieStorage,
	// }),
})
