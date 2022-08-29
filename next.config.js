/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN, 
  SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
  }, 
  images: {
    domain: ['cdn.shopify.com']
  }
}