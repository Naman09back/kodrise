import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.sanity.io",
      pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174"}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/**`,
    }],
  },
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
