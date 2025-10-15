import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '44398',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'evshow-global.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'd2g6bqkf4g3jqe.cloudfront.net',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'assets-us-01.kc-usercontent.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'api.strategic.ae',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'payment.aimcongress.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'media.aimcongress.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'api.aimcongress.com',
        pathname: '/**',
      },

      
    ],
  },
};

export default nextConfig;
