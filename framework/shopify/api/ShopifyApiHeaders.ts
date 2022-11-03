import {
    SHOPIFY_ADMIN_ACCESS_TOKEN,
    SHOPIFY_ADMIN_API_KEY,
    SHOPIFY_ADMIN_API_SECLET_KEY,
    SHOPIFY_ADMIN_API_URL,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_API_URL
} from "@shopify/const";

type ApiType = {
    type: "ADMIN_API" | "STOREFRONT_API"
}
export type Variables = { [key: string]: string | string[] | any | undefined }

const AdminApiHeaders = {
    Authorization: 'Basic ' + Buffer.from(SHOPIFY_ADMIN_API_KEY! + ':' + SHOPIFY_ADMIN_API_SECLET_KEY!).toString('base64'),
    'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
} as any

const StorefrontApiHeaders = {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
} as any


export const ShopifyApiFeatcher = async (api: ApiType, query: any, input?: Variables) => {
    const apiUrl = api.type === "ADMIN_API" ? SHOPIFY_ADMIN_API_URL : SHOPIFY_STOREFRONT_API_URL
    const headers = api.type === "ADMIN_API" ? AdminApiHeaders : StorefrontApiHeaders
    const response = await fetch(
        apiUrl!,
        {
        method: 'POST',
        mode: "no-cors",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: input
        }),
    })

    const data = await response.json()
    return data;
}