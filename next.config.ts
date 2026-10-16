import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Fractional COO page was retired; send old links to Services.
      { source: "/fractional-coo", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
