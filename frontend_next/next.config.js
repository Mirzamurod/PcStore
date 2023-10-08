const path = require('path')

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  },
}
