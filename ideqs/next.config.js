/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['162.19.88.73']
  },
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.devtool = 'inline-source-map';
    }
    if (!isServer) {
      config.resolve.fallback = {
        'react/jsx-runtime': 'react/jsx-runtime.js',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      }
    }
    return config
  },
}
