const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: true,
    webpackBuildWorker: true,
  },
  webpack(config) {
    config.plugins.push(
      require("unplugin-icons/webpack").default({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    return config;
  },
};

module.exports = withContentlayer(nextConfig);