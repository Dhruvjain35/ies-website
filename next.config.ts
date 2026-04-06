import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/leadership",
        destination: "/apply",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
