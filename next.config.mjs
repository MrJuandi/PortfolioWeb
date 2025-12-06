/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // <--- ESTO ES LO QUE TE FALTABA
      },
    ],
  },
};

export default nextConfig;