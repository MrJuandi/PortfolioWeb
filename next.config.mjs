/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/snell', destination: '/', permanent: true },
      { source: '/work/nightjar', destination: '/work/pandion', permanent: true },
    ];
  },
};

export default nextConfig;
