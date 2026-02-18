/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure blog routes work with static export
  trailingSlash: true,
  // Base path configuration (if deploying to /blog subdirectory)
  // basePath: '/blog',
}

export default nextConfig
