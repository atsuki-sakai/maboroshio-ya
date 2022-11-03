// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShopifyApiFeatcher } from '@shopify/api/ShopifyApiHeaders';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createCustomerMutation } from '@shopify/utils/mutations';


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
    const response = await ShopifyApiFeatcher({type: "STOREFRONT_API"},createCustomerMutation, {input: body})
    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
