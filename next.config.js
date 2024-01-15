/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        path: '/_next/image',
        loader: 'default',
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [320, 420, 768, 1024, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/**',
            }
        ],
    },


}

module.exports = nextConfig
