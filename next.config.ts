import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The platform was renamed from Stayqs99 to Drollers; keep old links working.
      { source: "/case-study/stayqs99", destination: "/case-study/drollers", permanent: true },
    ];
  },
};

export default nextConfig;
