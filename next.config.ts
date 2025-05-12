import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  // basePath: '/base',
  // assetPrefix: '/base/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
