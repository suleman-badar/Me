import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images - you can add remote patterns if needed
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Turbopack is enabled by default in Next.js 15 with --turbopack flag
  // Experimental features can be added here if needed
  experimental: {
    // optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;