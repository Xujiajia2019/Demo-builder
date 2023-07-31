/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    OPENAI_API_KEY: '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'
  }
}

module.exports = nextConfig
