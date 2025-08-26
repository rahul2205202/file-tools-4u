/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Allow uploads up to 50MB
    },
  },
  // --- NEW: Redirects Configuration ---
  async redirects() {
    return [
      // NEW: Rule to redirect www to non-www
      {
        source: '/:path*', // This matches all paths
        has: [
          {
            type: 'host',
            value: 'www.filetools4u.com',
          },
        ],
        destination: 'https://filetools4u.com/:path*', // Redirect to the non-www version
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
