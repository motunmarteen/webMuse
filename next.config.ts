import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Keep links to this page's earlier address working.
      { source: "/case-study/stayqs99", destination: "/case-study/drollers", permanent: true },
    ];
  },
};

export default nextConfig;
