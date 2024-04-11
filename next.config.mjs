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
      }
};

export default nextConfig;
