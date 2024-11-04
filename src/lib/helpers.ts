import { AvatarType, FanTokenType } from "@/types/types"

export const getTopAvatars = (avatars: AvatarType[], fantokens: FanTokenType[]) => {
		const avatarTokenCount = avatars?.reduce((count, avatar) => {
			count[avatar.phygital_id] = fantokens.filter(
				(token) => token.phygital_id === avatar.phygital_id
			).length
			return count
		}, {} as Record<string, number>)

		const topAvatarsData = Object.entries(avatarTokenCount)
			.sort(([, countA], [, countB]) => countB - countA)
			.slice(0, 3)
			.map(([phygitalId, count]) => {
				const avatar = avatars.find((a) => a.phygital_id === phygitalId)
				return { ...avatar, count }
			})

	return topAvatarsData
}