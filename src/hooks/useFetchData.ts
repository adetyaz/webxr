"use client"
import { useState, useEffect } from 'react'

interface FetchParams {
	url: string
}

const useFetch = ({ url }: any) => {
	const [data, setData] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)

			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`)
				}
				const result = await response.json()
				setData(result)
			} catch (error) {
				setError((error as Error).message)
			} finally {
				setLoading(false)
			}
		}

		if (url) {
			fetchData()
		}
	}, [url])

	return { data, loading, error }
}

export default useFetch
