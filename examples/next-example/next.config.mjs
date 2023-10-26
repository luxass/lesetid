import { withContentlayer } from "next-contentlayer";
import unpluginWebpack from "unplugin-icons/webpack";

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
  },
  webpack(config) {
    config.plugins.push(
      unpluginWebpack({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    return config;
  },
};

export default withContentlayer(nextConfig);
