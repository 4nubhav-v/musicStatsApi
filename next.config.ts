import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "coverartarchive.org", // replace with your image domain
      },
      {
        protocol: "https",
        hostname: "archive.org", // replace with your image domain
      },
    ],
  },
};

export default nextConfig;
