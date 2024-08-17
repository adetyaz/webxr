import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const baseURI = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

export const getBrands = async () => {
	const response = await axios.get(`${baseURI}/brands/all`)
	return response.data
}

export const getCollections = async () => {
	const response = await axios.get(`${baseURI}/collections/all`)
	return response.data
}

export const getPhygital = async (id: string) => {
	const response = await axios.get(`${baseURI}/phygitals/${id}`)
	return response.data
}

export const getWebXR = async (id: string) => {
	const response = await axios.get(`${baseURI}/webxr/phygital/${id}`)
	return response.data
}

export const getAvatars = async () => {
	const response = await axios.get(`${baseURI}/avatars/all`)
	return response.data
}

export const getFanTokens = async () => {
	const response = await axios.get(`${baseURI}/fantoken/all`)
	return response.data
}
