/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'placeimg.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'lapis-kukus.s3-ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}

module.exports = nextConfig
