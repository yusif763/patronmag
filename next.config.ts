import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',

    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.patronmag.com',
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