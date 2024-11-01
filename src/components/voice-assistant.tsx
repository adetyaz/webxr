'use client'
import { useEffect, useState } from 'react'
import { Mic, MicOff } from 'lucide-react'
import ChatCompletionCreateParams, { OpenAI } from 'openai'
import { useQuery } from '@tanstack/react-query'
import { getCollections, getBrands } from '@/utils/queries'
import { BrandType, CollectionType } from '@/types/types'

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
})

export const VoiceAssistant = ({
	productInfo,
	brandName,
	voice: avatarVoice,
	userType,
}: any) => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [response, setResponse] = useState('')

	// console.log(userType)

	const brands = useQuery({
		queryKey: ['brands'],
		queryFn: async () => {
			const result = await getBrands()
			return result.find((brand: BrandType) => brand.name === brandName) || null
		},
	})

	const collections = useQuery({
		queryKey: ['collections'],
		enabled: Boolean(brands?.data?.id), // Enable when brand data is available
		queryFn: async () => {
			if (!brands?.data?.id) return [] // Safeguard against missing brand data
			const result = await getCollections()
			return result.find(
				(collection: CollectionType) => collection.brand_id === brands.data.id // Directly access the brand ID
			)
		},
	})

	const [messages, setMessages] = useState([
		{
			role: 'system',
			content: `
    You are a brand and product spokesperson for ${brandName}. Use the information provided to answer user questions.

			This is the User Type/Role to follow ${userType}

    - If the user is a guest, limit your responses to only product-related details.
    - If the user is an owner, allow them to ask any questions they may have.

    Here is the product and brand information:

    - **Brand Description**: ${
			brands.data?.description || 'No description available'
		}
    - **Brand Additional Data**: ${
			brands.data?.additional_info || 'Not specified'
		}
    - **Collection Name**: ${collections.data?.name || 'Not specified'}
    - **Collection Description**: ${
			collections.data?.description || 'No description available'
		}
    - **Product Name**: ${productInfo.name || 'Not specified'}
    - **Product Description**: ${productInfo.description || 'Not specified'}
    - **Manufacturer**: ${productInfo.manufacturer || 'Not specified'}
    - **Category**: ${productInfo.category?.data?.[0] || 'Uncategorized'}
    - **Color**: ${productInfo.color || 'Not specified'}
    - **Material**: ${productInfo.material || 'Not specified'}
    - **Origin Country**: ${productInfo.origin_country || 'Not specified'}
    - **Price**: ${productInfo.price || 'Free'}
    - **Product Information**: ${
			productInfo.product_info || 'No additional information'
		}
    - **Size**: ${productInfo.size || 'Not specified'}
    - **Quantity**: ${productInfo.quantity || 'Not specified'}
    - **Royalty**: ${productInfo.royalty || 'None'}
    - **Weight**: ${productInfo.weight || 'Not specified'} kg
    - **Usage**: ${productInfo.usage || 'Not specified'}

    Never mention or disclose the following details:
    - "deployer_address"
    - "contract_address"
    - "chaintype_id"
    - "graph_url"
    - "collection_id"

    Respond to inquiries with clear, concise answers, keeping responses under 20 words for guests.
  `,
		},
	])

	// useEffect(() => {
	// 	const synth = window.speechSynthesis

	// 	// Create a speech synthesis utterance
	// 	const utterance = new SpeechSynthesisUtterance(
	// 		`Welcome, Feel free to explore ${brandName} and discover hidden treasures together with your AI companion.`
	// 	)

	// 	// Speak the message after a delay of 5 seconds
	// 	const timeoutId = setTimeout(() => {
	// 		if (!synth.speaking) {
	// 			synth.speak(utterance)
	// 		}
	// 	}, 5000)

	// 	// Cleanup function to cancel speech synthesis and timeout if necessary
	// 	return () => {
	// 		clearTimeout(timeoutId)
	// 		if (synth.speaking) {
	// 			synth.cancel()
	// 			console.log('Speech synthesis canceled')
	// 		}
	// 	}
	// }, [])

	useEffect(() => {
		// Feature detection for webkitSpeechRecognition
		const SpeechRecognition =
			(window as any).SpeechRecognition ||
			(window as any).webkitSpeechRecognition
		let recognition: any

		if (SpeechRecognition) {
			recognition = new SpeechRecognition()
			recognition.continuous = false
			recognition.interimResults = false
			recognition.lang = 'en-US'

			recognition.onresult = (event: any) => {
				const speechToText = event.results[0][0].transcript
				setTranscript(speechToText)
				addMessage({ role: 'user', content: speechToText })
				getOpenAIResponse(speechToText)
			}

			recognition.onerror = (event: any) => {
				console.error('Speech recognition error', event)
				setIsListening(false)
			}

			recognition.onend = () => {
				setIsListening(false)
			}
		}

		if (isListening && recognition) {
			recognition.start()
		} else if (recognition) {
			recognition.stop()
		} else {
			console.warn('Speech Recognition API is not supported in this browser.')
			setIsListening(false) // Automatically stop listening in unsupported browsers
		}

		return () => {
			if (recognition) {
				recognition.stop()
			}
		}
	}, [isListening])

	const getOpenAIResponse = async (text: string) => {
		try {
			const newMessages = [...messages, { role: 'user', content: text }]
			const params: ChatCompletionCreateParams = {
				//@ts-ignore
				model: 'gpt-3.5-turbo',
				messages: newMessages.map((msg) => ({
					role: msg.role as 'user' | 'assistant' | 'system',
					content: msg.content,
				})),
				max_tokens: 50,
				temperature: 0.2,
			}

			//@ts-ignore
			const response = await openai.chat.completions.create(params)
			const aiResponse = response.choices?.[0]?.message?.content?.trim()
			if (aiResponse) {
				setResponse(aiResponse)
				setMessages((prevMessages) => [
					...prevMessages,
					{ role: 'assistant', content: aiResponse },
				])
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

		// Try to match the gender in the voice name
		const selectedVoice = voices.find((voice) => {
			if (avatarVoice === 'Richard') {
				return voice.name === 'Google UK English Male'
			} else if (avatarVoice === 'Denise') {
				return voice.name === 'Google UK English Female'
			}
			return false
		})

		if (selectedVoice) {
			utterance.voice = selectedVoice
		} else if (voices.length > 0) {
			// Fallback to the first voice if no matching gender voice is found
			utterance.voice = voices[0]
		}

		synth.speak(utterance)
	}

	const handleListen = () => {
		setIsListening((prevState) => !prevState)
	}

	return (
		<div className='flex flex-col justify-center items-center text-center'>
			{/* {transcript && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>User: &nbsp;{transcript}</p>
				</div>
			)}
			{response && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>Assistant: &nbsp;{response}</p>
				</div>
			)} */}
			<div>
				<button
					onClick={handleListen}
					className='cursor-pointer border-2 border-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'
				>
					{isListening ? <Mic /> : <MicOff />}
				</button>
				<p>Click on the icon to speak with the avatar</p>
			</div>
		</div>
	)
}
