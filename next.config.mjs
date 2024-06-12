/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'narrative-engine-campaing-images.s3.us-west-2.amazonaws.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'rulebooks-demo.us-west-2.amazonaws.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
      webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
          config.resolve.fallback = { fs: false };
        }
    
        // Add node-loader for handling .node files
        config.module.rules.push({
          test: /\.node$/,
          loader: 'node-loader',
        });
    
        return config;
      },
};

export default nextConfig;
