// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShopifyApiFeatcher } from '@shopify/api/ShopifyApiFetcher';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createCustomerMutation } from '@shopify/utils/mutations';

interface CustomerCreateInput {
    email: string
    password: string
    acceptsMarketing: boolean
    firstName: string
    lastName: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerCreateInput

    // TODO - ここで変換するのは良くない？

    const variables = {
        input: {
            email: body.email,
            password: body.password,
            acceptsMarketing: body.acceptsMarketing,
            firstName: body.firstName,
            lastName: body.lastName,
        }
    }
    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        createCustomerMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
