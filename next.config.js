const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = { swcMinify: false };

module.exports = withContentlayer(nextConfig);
