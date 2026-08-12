import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vinext serves local assets directly; bypassing the Next image proxy
    // prevents redirected image requests from appearing broken in browsers.
    unoptimized: true,
  },
};

export default nextConfig;
