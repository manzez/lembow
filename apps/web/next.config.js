/** @type {import('next').NextConfig} */
const nextConfig = {
  // App router is now stable in Next.js 15
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
module.exports = nextConfig
