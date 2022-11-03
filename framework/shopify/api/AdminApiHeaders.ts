import { ADMIN_ACCESS_TOKEN, ADMIN_API_KEY, ADMIN_API_SECLET_KEY } from "@shopify/const";

export const AdminApiHeaders = {
    Authorization: 'Basic ' + Buffer.from(ADMIN_API_KEY! + ':' + ADMIN_API_SECLET_KEY!).toString('base64'),
    'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
} as any