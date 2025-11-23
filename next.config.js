/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled by default in Next.js 16
  // html2canvas works fine with Turbopack without special configuration
  turbopack: {},
}

module.exports = nextConfig

