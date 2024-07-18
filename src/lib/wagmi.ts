'use client'
import { getDefaultConfig, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { cookieStorage, createStorage, createConfig, http } from 'wagmi'
import { createClient } from 'viem'
import { baseSepolia, polygonZkEvmCardona } from 'wagmi/chains'
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
	chains: [baseSepolia, polygonZkEvmCardona],
	ssr: false, // If your dApp uses server side rendering (SSR)
	client({ chain }) {
		return createClient({ chain, transport: http() })
	},
	// storage: createStorage({
	// 	storage: cookieStorage,
	// }),
})
