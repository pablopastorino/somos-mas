/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mongodburl: process.env.MONGODB_URL
  },
  images: {
    domains: [
      'images.unsplash.com',
      'somos-mas.s3.amazonaws.com',
      'somos-mas.s3.us-east-1.amazonaws.com'
      // `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      // `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`
    ]
  }
}

module.exports = nextConfig
