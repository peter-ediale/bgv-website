import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Serve pre-made WebP sizes (see image-loader.ts) instead of resizing on the server.
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
};

export default nextConfig;
