/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async redirects() {
    return [
      
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.filetools4u.com',
          },
        ],
        destination: 'https://filetools4u.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
