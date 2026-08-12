import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product imagery is already prepared at display resolution. Serving it
    // directly also keeps private Blob proxy URLs predictable on Vercel.
    unoptimized: true,
  },
};

export default nextConfig;
