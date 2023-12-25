import UnpluginIcons from "unplugin-icons/webpack";
import {
  withContentlayer,
} from "next-contentlayer";

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
      UnpluginIcons({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    return config;
  },
};

export default withContentlayer(nextConfig);
