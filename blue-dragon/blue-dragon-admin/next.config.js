const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      "thru-dev.s3.amazonaws.com"
    ]
  }
}
