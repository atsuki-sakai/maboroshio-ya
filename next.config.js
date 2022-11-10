/** @type {import('next').NextConfig} */
const { projectLocale } = require("./framework/locale")

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestooration: true
  },
  images:{
    domains: [ "cdn.shopify.com"]
  }
  // i18n: {
  //   locales: projectLocale,
  //   defaultLocale: projectLocale[0]
  // }
}