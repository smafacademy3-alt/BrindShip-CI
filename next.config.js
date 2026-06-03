/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Explicit configuration for Next.js 13+ App Router
  // Disable Pages Router to avoid conflicts
  experimental: {
    appDir: true,
  },
  pageExtensions: ["ts", "tsx"],
};

module.exports = nextConfig;
