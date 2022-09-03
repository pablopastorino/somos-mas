/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		mongodburl: process.env.MONGODB_URL
	}
}

module.exports = nextConfig
