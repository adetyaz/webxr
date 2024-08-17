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
}: any) => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [response, setResponse] = useState('')

	const brands = useQuery({
		queryKey: ['brands'],
		queryFn: async () => {
			const result = await getBrands()
			return result.filter((brand: BrandType) => brand.name === brandName)
		},
	})

	const collections = useQuery({
		queryKey: ['collections'],
		enabled: brands?.data?.id !== null,
		queryFn: async () => {
			const result = await getCollections()
			return result.filter(
				(collection: CollectionType) =>
					collection.brand_id === brands.data?.[0].id
			)
		},
	})

	const [messages, setMessages] = useState([
		{
			role: 'system',
			content: `
      you are a brand and products spokesperson for ${brandName}, use this to answer questions "${productInfo} 
			${brands.data?.[0].description} 
			${brands.data?.[0].additional_info} 			
			", 
			totally ignore the following and never speak on it "deployer_address"
"contract_address", "chaintype_id", "graph_url", "collection_id" . Respond to inquiries with clear, concise answers under 20 words, use information shared only.`,
		},
	])
	const [gender, setGender] = useState('')

	useEffect(() => {
		const synth = window.speechSynthesis

		// Create a speech synthesis utterance
		const utterance = new SpeechSynthesisUtterance(
			"Welcome to our world! Feel free to explore and discover hidden treasures together with your AI companion. Let's embark on this adventure!"
		)

		// Speak the message after a delay of 5 seconds
		const timeoutId = setTimeout(() => {
			if (!synth.speaking) {
				synth.speak(utterance)
			}
		}, 5000)

		// Cleanup function to cancel speech synthesis and timeout if necessary
		return () => {
			clearTimeout(timeoutId)
			if (synth.speaking) {
				synth.cancel()
				console.log('Speech synthesis canceled')
			}
		}
	}, [])

	useEffect(() => {
		if (avatarVoice === 'Denise') {
			console.log(gender)
			setGender('female')
		} else if (avatarVoice === 'Richard') {
			console.log(gender)
			setGender('male')
		}

		const recognition = new (window as any).webkitSpeechRecognition()
		recognition.continuous = false
		recognition.interimResults = false
		recognition.lang = 'en-US'

		recognition.onresult = (event: any) => {
			const speechToText = event.results[0][0].transcript
			// console.log(speechToText)
			setTranscript(speechToText)
			addMessage({ role: 'user', content: speechToText })
			getOpenAIResponse(speechToText)
		}

		recognition.onerror = (event: any) => {
			// console.error('Speech recognition error', event)
			setIsListening(false)
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
	}, [isListening, avatarVoice, gender])

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
				speak(aiResponse, gender)
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

	const speak = (text: string, gender: string) => {
		const synth = window.speechSynthesis
		const utterance = new SpeechSynthesisUtterance(text)
		const voices = synth.getVoices()

		// Try to match the gender in the voice name
		const selectedVoice = voices.find((voice) => {
			if (gender === 'male') {
				return /male/i.test(voice.name) || /male/i.test(voice.lang)
			} else if (gender === 'female') {
				return /female/i.test(voice.name) || /female/i.test(voice.lang)
			}
			return false
		})

		if (selectedVoice) {
			utterance.voice = selectedVoice
			console.log(selectedVoice)
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
			{transcript && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>User: &nbsp;{transcript}</p>
				</div>
			)}
			{response && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>Assistant: &nbsp;{response}</p>
				</div>
			)}
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

// ${collections.data[0].description}
// 			${collections.data[0].name}
