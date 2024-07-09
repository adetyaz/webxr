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
	title: 'WebXR | MyriadFlow',
	description: 'The future of shopping is here! MyriadFlow lets you chat with lifelike AI brand ambassadors about your favorite products, all within a captivating VR experience.',
	icons: {
		icon: '/favicon.ico',
	},
	openGraph: {
		type: 'website',
		url: 'https://webxr-ebon.vercel.app',
		title: 'WebXR | MyriadFlow',
		description: 'The future of shopping is here! MyriadFlow lets you chat with lifelike AI brand ambassadors about your favorite products, all within a captivating VR experience.',
		images: [
			{
				url: '/metaimg.png', // Path to the image in the public folder
				width: 1200,
				height: 630,
				alt: 'MyriadFlow WebXR',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@MyriadFlow',
		title: 'WebXR | MyriadFlow',
		description: 'The future of shopping is here! MyriadFlow lets you chat with lifelike AI brand ambassadors about your favorite products, all within a captivating VR experience.',
		images: [
			{
				url: '/metaimg.png', // Path to the image in the public folder
				width: 1200,
				height: 630,
				alt: 'MyriadFlow WebXR',
			},
		],
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
				<link rel='icon' href='/favicon.ico' sizes='any' />
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
