import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@podcast-index/shared-ui'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
