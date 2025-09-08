/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'",
  },
];

// output: 'standalone',
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
  async headers() {
    return [
      {
        // Match all static files (CSS, JS, images, etc.)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, immutable",
          },
        ],
      },
      {
        // Match all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Match all other routes (pages, etc.)
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    domains: [
      "tradebrains.in",
      "pagead2.googlesyndication.com",
      "tradebrains-portal.s3.amazonaws.com",
      "fingrad-staging.s3.amazonaws.com",
      "fingrad-staging.s3.ap-south-1.amazonaws.com",
      "firebasestorage.googleapis.com",
      "st3.depositphotos.com",
      "lh3.googleusercontent.com",
      "tradebrains-portal.s3.ap-south-1.amazonaws.com",
      "https://tradebrains.in/features/wp-json/wp",
    ],
  },
};
