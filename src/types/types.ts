export type AvatarType = {
	id: string
	avatar_id: string
	url: string
	user_id: string
	phygital_id: string
	avatar_voice: string
	chaintype_id: string
	created_at: string
	updated_at: string
}

export type FanTokenType = {
	id: string
	brand_id: string
	collection_id: string
	phygital_id: string
	created_at: string
	updated_at: string
	fan_token_id: string
	chaintype_id: string
	phygital_name: string
}

export type BrandType = {
	id: string
	name: string
	description: string
	logo_image: string
	cover_image: string
	representative: string
	contact_email: string
	contact_phone: string
	shipping_address: string
	additional_info: string
	industry: string
	tags: string
	fees: number
	payout_address: string
	access_master: string
	trade_hub: string
	blockchain: string
	chain_id: string
	manager_id: string
	chaintype_id: string
}

export type CollectionType = {
	iduuid: string
	name: string
	description: string
	logo_image: string
	cover_image: string
	category: any // Replace with appropriate type if known
	tags: string
	status: bigint
	brand_id: string
	chaintype_id: string
}
