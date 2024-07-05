import './globals.css'
import type { Metadata } from 'next'
import { Bai_Jamjuree as FontSans } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
// import { headers } from 'next/headers'

import { cn } from '@/lib/utils'
import Script from 'next/script'
import '@rainbow-me/rainbowkit/styles.css'

import Web3ModalProvider from '@/lib/providers'

const fontSans = FontSans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Phygital WebXR',
	description: 'Myriadflow WebXR Experience',
	icons: {
		icon: '/MFlogo.png',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' href='/MFlogo.png' sizes='any' />
				<Script src='https://aframe.io/releases/1.5.0/aframe.min.js'></Script>
			</head>
			{/* <Providers> */}
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<Web3ModalProvider>{children}</Web3ModalProvider>
			</body>
			{/* </Providers> */}
		</html>
	)
}
