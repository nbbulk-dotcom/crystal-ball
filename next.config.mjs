/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for production deployment
  output: 'standalone',
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Configure image domains if needed
  images: {
    domains: ['resonancemap.org', 'abacusai.app'],
  },
  
  // Webpack config for additional modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;