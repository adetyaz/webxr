'use client'
import { InfoCard } from '@/components/info-card'
import { Mic, MicOff } from 'lucide-react'
import Image from 'next/image'
import { Avatar } from '@readyplayerme/visage'
import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/connect-wallet'
import { useEffect, useState } from 'react'
import { ConnectWalletModal } from '@/components/connect-wallet-modal'
import { CongratulationsModal } from '@/components/congratulations-modal'
import { CongratulationsNft } from '@/components/congratulations-nft'
import ChatCompletionCreateParams, { OpenAI } from 'openai'
import useFetch from '@/hooks/useFetchData'

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
})

export default function Home() {
	const [unlockModal, setUnlockModal] = useState(false)
	const [unlocked, setUnlocked] = useState(false)
	const [unlockClaimed, setUnlockClaimed] = useState(false)
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [response, setResponse] = useState('')
	const [phygitalData, setPhygitalData] = useState<any>([])
	const [webXrData, setWebXrData] = useState<any>([])
	const [avatar, setAvatar] = useState<any>([])

	const [messages, setMessages] = useState([
		{
			role: 'system',
			content: `The following conversation is centered around ${phygitalData?.description}, your answers should be based on the topic only keep it short`,
		},
	])

	const account = useAccount()

	const closeCongratulations = () => {
		setUnlockModal(false)

		setTimeout(() => {
			setUnlockClaimed(true)
		}, 5000)
	}

	const closeClaimed = () => {
		setUnlockClaimed(false)
	}

	useEffect(() => {
		// Initialize speech recognition
		const recognition = new (window as any).webkitSpeechRecognition()
		recognition.continuous = false
		recognition.interimResults = false
		recognition.lang = 'en-US'

		recognition.onresult = (event: any) => {
			const speechToText = event.results[0][0].transcript

			console.log(speechToText)
			setTranscript(speechToText)
			addMessage({ role: 'user', content: speechToText })
			getOpenAIResponse(speechToText)
		}

		recognition.onend = () => {
			setIsListening(false)
		}

		if (isListening) {
			recognition.start()
		} else {
			recognition.stop()
		}

		return () => {
			recognition.stop()
		}
	}, [isListening])

	const fetchPhtgitalData = async () => {
		try {
			const res = await fetch(
				`https://app.myriadflow.com/phygitals/9b9a18f0-a753-4570-918e-91b11fd96e69`
			)

			const webxr = await fetch(
				`https://app.myriadflow.com/webxr/db543a9e-1133-47be-b618-03a60033f31d`
			)

			const avatarRes = await fetch(
				`https://app.myriadflow.com/avatars/11367b99-b58d-4b65-b6e5-7fcdd7977c50`
			)

			const data = await res.json()
			const webdata = await webxr.json()
			const avatardata = await avatarRes.json()

			console.log(webdata)
			console.log(avatardata)

			setPhygitalData(data)
			setWebXrData(webdata)
			setAvatar(avatardata)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchPhtgitalData()

		setTimeout(() => {
			setUnlockModal(true)
		}, 50000)
	}, [])

	const getOpenAIResponse = async (text: string) => {
		try {
			const params: ChatCompletionCreateParams = {
				//@ts-ignore
				model: 'gpt-3.5-turbo',
				messages: messages.map((msg) => ({
					role: msg.role as 'user' | 'assistant' | 'system',
					content: msg.content,
				})),
				max_tokens: 50,
			}

			//@ts-ignore
			const response = await openai.chat.completions.create(params)
			const aiResponse = response.choices?.[0]?.message?.content?.trim()
			if (aiResponse) {
				setResponse(aiResponse)
				addMessage({ role: 'assistant', content: aiResponse })
				speak(aiResponse)
			} else {
				console.error('Received an invalid response from OpenAI')
			}
		} catch (error) {
			console.error('Error fetching OpenAI response:', error)
		}
	}

	const addMessage = (message: {
		role: 'user' | 'assistant'
		content: string
	}) => {
		setMessages((prevMessages) => [...prevMessages, message])
	}

	const speak = (text: string) => {
		const synth = window.speechSynthesis
		const utterance = new SpeechSynthesisUtterance(text)

		const voices = synth.getVoices()
		const femaleVoice = voices.find(
			(voice) => /female/i.test(voice.name) || /woman/i.test(voice.name)
		)

		if (femaleVoice) {
			utterance.voice = femaleVoice
		} else if (voices.length > 0) {
			// Fallback to the first voice if no female voice is found
			utterance.voice = voices[0]
		}

		synth.speak(utterance)
	}

	const handleListen = () => {
		setIsListening((prevState) => !prevState)
	}

	const removePrefix = (uri: any) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<main className='flex h-screen flex-col items-center justify-between p-24 relative'>
			<header className='absolute top-0 p-4 w-full flex justify-between z-10'>
				<Image src='/logo.png' alt='logo' height={150} width={250} />
				<ConnectWallet />
			</header>

			<a-scene className='h-48'>
				<a-sky
					src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
						webXrData?.image360
					)}`}
					rotation='0 -130 0'
				></a-sky>
			</a-scene>
			<section>
				<div className='absolute right-2 bottom-2'>
					<InfoCard phygital={phygitalData} />
				</div>
				<div className='absolute left-[35%] text-white bottom-2'>
					{transcript && (
						<p className='bg-black text-white'>User: {transcript} </p>
					)}
					{response && (
						<p className='bg-black text-white'>Assistant: {response} </p>
					)}
					<button className='border-2 border-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'>
						{isListening ? <Mic onClick={handleListen} /> : <MicOff />}
					</button>
					<p>Click on the icon to speak with the avatar</p>
				</div>
				<div className='absolute h-3/4 left-4 bottom-16'>
					<Avatar modelSrc={avatar && avatar.url} cameraInitialDistance={3.5} />
					<button className='border-2 border-white text-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'>
						{unlocked ? 'Customize' : 'Unlock'}
					</button>
				</div>
				{!account.address && (
					<div className='absolute inset-0'>
						<ConnectWalletModal />
					</div>
				)}
				{account.address && unlockModal && (
					<div className='absolute inset-0'>
						<CongratulationsModal onClose={closeCongratulations} />
					</div>
				)}
				{account.address && unlockClaimed && (
					<div className='absolute inset-0'>
						<CongratulationsNft
							onClose={closeClaimed}
							freeNft={webXrData.free_nft_image}
						/>
					</div>
				)}
			</section>
		</main>
	)
}
