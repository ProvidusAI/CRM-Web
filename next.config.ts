import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Negative lookahead: /salesforce-recruitment-agency is a real page,
        // not a legacy service URL — without it this rule would hijack it.
        source: "/salesforce-:slug((?!recruitment-agency$).+)",
        destination: "/services/salesforce-:slug",
        permanent: true,
      },
      // The staff augmentation page shipped briefly at this path.
      {
        source: "/staff-augmentation",
        destination: "/salesforce-recruitment-agency",
        permanent: true,
      },
      {
        source: "/salesforce/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      // Education and Commerce Cloud shipped under platform-expertise before
      // being reclassified as industries.
      {
        source: "/platform-expertise/salesforce-education-cloud-consulting",
        destination: "/industries/salesforce-education-cloud-consulting",
        permanent: true,
      },
      {
        source: "/platform-expertise/salesforce-commerce-cloud-consulting",
        destination: "/industries/salesforce-commerce-cloud-consulting",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
