/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/shop',
        destination: '/mural-paintings',
      },
      {
        source: '/shop/:path*',
        destination: '/mural-paintings/:path*',
      },
    ]
  },
}

module.exports = nextConfig
