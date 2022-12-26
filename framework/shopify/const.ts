

const DEVLOPMENT = true
const NGROK_URL = "https://0e08-219-122-209-55.jp.ngrok.io"

// .envに移す
export const SHOPIFY_STORE_DOMAIN = "https://xn-68jwdf5d1604a.myshopify.com"

export const HOSTING_URL = DEVLOPMENT ? NGROK_URL :  process.env.NEXT_PUBLIC_HOSTING_URL
export const SHOPIFY_ADMIN_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_URL
export const SHOPIFY_STOREFRONT_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL

export const SHOPIFY_COOKIE_EXPIRE = 90
export const SHOPIFY_CHECKOUT_URL_COOKIE = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL_COOKIE
export const SHOPIFY_CHECKOUT_ID_COOKIE = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_COOKIE_ID

export const SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE = 30
export const SHOPIFY_CUSTOMER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCESS_TOKEN

export const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
export const SHOPIFY_ADMIN_API_KEY = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_KEY
export const SHOPIFY_ADMIN_API_SECLET_KEY = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_SECLET_KEY
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCCESS_TOKEN