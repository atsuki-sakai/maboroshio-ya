/** @type {import('next').NextConfig} */
const { projectLocale } = require("./framework/locale")

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: [ "cdn.shopify.com"]
  }
  // i18n: {
  //   locales: projectLocale,
  //   defaultLocale: projectLocale[0]
  // }
}


console.log("next.config: ",JSON.stringify(module.exports, null, 2))

