import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async rewrites() {
    return {
      beforeFiles: [
        {source: "/site-assets/:path*", destination: "/api/site-assets/:path*"},
      ],
    };
  },
};

export default nextConfig;
