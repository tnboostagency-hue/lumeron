import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  // Cloudflare Pages serves from /out by default; trailingSlash improves routing
  trailingSlash: true,
  // Next.js Image Optimization is not available in static export;
  // use unoptimized so <Image> tags still work (CDN/Cloudflare handles caching)
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Turbopack loader only active in dev (next dev --turbopack)
  ...(process.env.NODE_ENV !== 'production' && {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER],
        },
      },
    },
  }),
};

export default nextConfig;
// Orchids restart: 1771446914645
