import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://1fi-backend.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
