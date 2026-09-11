import type { NextConfig } from 'next';

const apiOrigin = process.env.API_ORIGIN ?? 'http://localhost:3000';

const nextConfig: NextConfig = {
  // The API sends no CORS headers, so the browser talks to it through this
  // proxy. API paths have no `/api` prefix (e.g. `/auth/otp/verify`).
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${apiOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;
