import './globals.css'
import type { Metadata } from 'next'
import { Bai_Jamjuree as FontSans } from 'next/font/google'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { cn } from '@/lib/utils'
import Script from 'next/script'
import { config } from '@/lib/wagmi'
import Web3ModalProvider from '@/lib/providers'
import Providers from '@/lib/providers'

const fontSans = FontSans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Phygital WebXR',
	description: 'Myriadflow WebXR Experience',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const initialState = cookieToInitialState(config, headers().get('cookie'))
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<Script src='https://aframe.io/releases/1.5.0/aframe.min.js'></Script>
			</head>
			{/* <Providers> */}
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<Web3ModalProvider initialState={initialState}>
					{children}
				</Web3ModalProvider>
			</body>
			{/* </Providers> */}
		</html>
	)
}
