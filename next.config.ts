import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase limit (adjust as needed)
    },
  },
  images: { unoptimized: true },
};

export default nextConfig;
