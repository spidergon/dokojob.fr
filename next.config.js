/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // experimental: { appDir: true },
  images: {
    domains: ['entreprise.pole-emploi.fr', 'res.cloudinary.com'],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

// module.exports = withBundleAnalyzer({
//   images: {
//     domains: ['entreprise.pole-emploi.fr', 'res.cloudinary.com'],
//   },
//   swcMinify: true,
// });
