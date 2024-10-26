/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding')
		return config
	},
	images: {
		domains: [
			'utfs.io',
			'nftstorage.link',
			'ivory-adjacent-hyena-559.mypinata.cloud',
		],
	},
}

module.exports = nextConfig
