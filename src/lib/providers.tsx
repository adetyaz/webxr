'use client'

import React, { ReactNode } from 'react'
import { projectId, rainbowconfig } from './wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// // Create modal
// createWeb3Modal({
// 	wagmiConfig: config,
// 	projectId,
// 	enableAnalytics: true, // Optional - defaults to your Cloud configuration
// 	enableOnramp: true, // Optional - false as default
// })

export default function Web3ModalProvider({
	children,
	initialState,
}: {
	children: ReactNode
	initialState?: State
}) {
	return (
		<WagmiProvider config={rainbowconfig} initialState={initialState}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
