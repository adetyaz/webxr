'use client'

import React, { ReactNode } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import { config, projectId } from './wagmi'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
require('@solana/wallet-adapter-react-ui/styles.css')

// Initialize React Query Client
const queryClient = new QueryClient()

if (!projectId) {
	throw new Error('Wallet Connect Project ID is not defined')
}

// Initialize Web3Modal
createWeb3Modal({
	wagmiConfig: config,
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false by default
})

interface AppKitProviderProps {
	children: ReactNode
	initialState?: State
}

export default function AppKitProvider({
	children,
	initialState,
}: AppKitProviderProps) {
	return (
		<WagmiProvider config={config} initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}

export function ClientProviders({
	children,
	initialState,
}: {
	children: React.ReactNode
	initialState: any
}) {
	const network = WalletAdapterNetwork.Devnet
	const endpoint = clusterApiUrl(network)
	const wallets = [new PhantomWalletAdapter()]
	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<AppKitProvider initialState={initialState}>
						{children}
					</AppKitProvider>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}
