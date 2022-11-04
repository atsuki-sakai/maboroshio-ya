// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShopifyApiFeatcher } from '@shopify/api/ShopifyApiHeaders';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createCustomerMutation } from '@shopify/utils/mutations';
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_STOREFRONT_API_URL } from '@shopify/const';
interface CustomerCreateInput {
    email: string
    password: string
    acceptsMarketing: boolean
    firstName: string
    lastName: string
    phone: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    const body = await JSON.parse(req.body) as CustomerCreateInput

    const StorefrontApiHeaders = {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    } as any


    const variables = {
        input: {
            email: body.email,
            password: body.password,
            acceptsMarketing: body.acceptsMarketing,
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone
        }
    }

    const response = await fetch(SHOPIFY_STOREFRONT_API_URL!,{
        method: 'POST',
        mode: "no-cors",
        headers: StorefrontApiHeaders,
        body: JSON.stringify({
            query: createCustomerMutation,
            variables: variables,
        }),
    })
    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
