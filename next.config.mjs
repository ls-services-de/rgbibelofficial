/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com', 'cdn.sanity.io'], // Allow images from both domains
  },
};

export default nextConfig;
