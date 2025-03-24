import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/pdf.worker.min.js",
        destination: "/api/pdf-worker",
      },
    ];
  },
};

export default nextConfig;
