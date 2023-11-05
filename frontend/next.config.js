/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  nextConfig,
  reactStrictMode: false,
  env: {
    API_AUTH_URL: process.env.API_AUTH_URL,
    API_POST_URL: process.env.API_POST_URL,
    // DEFAULT_AVATAR: process.env.DEFAULT_AVATAR
  },
  typescript: { ignoreBuildErrors: true }
}
