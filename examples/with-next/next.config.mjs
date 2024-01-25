import UnpluginIcons from "unplugin-icons/webpack"

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      UnpluginIcons({
        compiler: "jsx",
        jsx: "react",
      }),
    )

    return config
  },
}

export default nextConfig
