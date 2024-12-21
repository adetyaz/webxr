import { useConversation } from '@11labs/react'
import { useCallback, useState, useEffect } from 'react'
import { Mic, MicOff, StopCircle } from 'lucide-react'
// import { ElevenLabsClient } from 'elevenlabs'
import { useQuery } from '@tanstack/react-query'
import { PhygitalType, BrandType, CollectionType } from '@/types/types'
import { getCollections, getBrands } from '@/utils/queries'

export const VoiceAsssitantEleven = ({
	phygital,
	voice,
}: {
	phygital: PhygitalType
	voice: string
}) => {
	const [isSpeaking, setIsSpeaking] = useState(false)

	// console.log(voice)

	const getVoices = (voice: string) => {
		if (voice.toLowerCase() === 'denise') {
			return '9BWtsMINqrJLrRacOk9x'
		} else if (voice.toLowerCase() === 'richard') {
			return 'cjVigY5qzO86Huf0OWal'
		}
	}

	const brands = useQuery({
		queryKey: ['brands'],
		queryFn: async () => {
			const result = await getBrands()
			return (
				result.find((brand: BrandType) => brand.name === phygital.brand_name) ||
				null
			)
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

	const conversation = useConversation({
		onConnect: () => console.log('Connected'),
		onDisconnect: () => console.log('Disconnected'),
		onMessage: (message) => console.log('Message:', message),
		onError: (error) => console.error('Error:', error),
		overrides: {
			agent: {
				prompt: {
					prompt: `
					You are a support agent. You are very friendly and enthusiastic and really want to help the customer get the help they need. Answer in 3 to 7 sentences in most cases.
					The product name. ${phygital.name}
					You're to answer questions about the product, its features, and how it can be used. You can also provide information about the brand and its values.

					Here is the product and brand information:

					the Brand Name is ${phygital.brand_name}

						- **Brand Description**: ${
							brands.data?.description || 'No description available'
						}
						- **Brand Additional Data**: ${brands.data?.additional_info || 'Not specified'}
						- **Collection Name**: ${collections.data?.name || 'Not specified'}
						- **Collection Description**: ${
							collections.data?.description || 'No description available'
						}
						- **Product Name**: ${phygital.name || 'Not specified'}
						- **Product Description**: ${phygital.description || 'Not specified'}
						- **Manufacturer**: ${phygital.manufacturer || 'Not specified'}
						- **Category**: ${phygital.category?.data?.[0] || 'Uncategorized'}
						- **Color**: ${phygital.color || 'Not specified'}
						- **Material**: ${phygital.material || 'Not specified'}
						- **Origin Country**: ${phygital.origin_country || 'Not specified'}
						- **Price**: ${phygital.price || 'Free'}
						- **Product Information**: ${
							phygital.product_info || 'No additional information'
						}
						- **Size**: ${phygital.size || 'Not specified'}
						- **Quantity**: ${phygital.quantity || 'Not specified'}
						- **Royalty**: ${phygital.royalty || 'None'}
						- **Weight**: ${phygital.weight || 'Not specified'} kg
						- **Usage**: ${phygital.usage || 'Not specified'}

					
					`,
				},
				firstMessage: `Hi welcome to ${phygital.name}, how can I help you today?`,
				language: 'en',
			},
			tts: {
				voiceId: getVoices(voice),
			},
		},
	})

	const startConversation = useCallback(async () => {
		try {
			// Request microphone permission
			await navigator.mediaDevices.getUserMedia({ audio: true })
			setIsSpeaking(true)

			// Start the conversation with your agent

			await conversation.startSession({
				agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENTID!, // Replace with your agent ID
			})
		} catch (error) {
			console.error('Failed to start conversation:', error)
		}
	}, [conversation])

	const stopConversation = useCallback(async () => {
		setIsSpeaking(false)

		await conversation.endSession()
	}, [conversation])

	return (
		<div className='flex items-center justify-center'>
			{isSpeaking ? (
				<button
					onClick={stopConversation}
					disabled={conversation.status !== 'connected'}
					className='cursor-pointer border-2 border-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'
				>
					<MicOff />
					<StopCircle />
				</button>
			) : (
				<button
					onClick={startConversation}
					disabled={conversation.status === 'connected'}
					className='cursor-pointer border-2 border-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'
				>
					<Mic />
				</button>
			)}
		</div>
	)
}
