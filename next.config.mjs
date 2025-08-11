/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Allow uploads up to 50MB
    },
  },
};

export default nextConfig;
