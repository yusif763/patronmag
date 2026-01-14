import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.patronmag.com',
            },
            {
                protocol: 'http',
                hostname: '**.patronmag.com',
            },
            {
                protocol: 'https',
                hostname: '**.patronmag.com',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    reactStrictMode: true,
};

export default nextConfig;