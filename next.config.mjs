/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/snell', destination: '/', permanent: true }];
  },
};

export default nextConfig;
