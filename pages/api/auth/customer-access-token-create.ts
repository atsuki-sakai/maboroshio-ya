// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShopifyApiFeatcher } from '@shopify/api/ShopifyApiFetcher';
import type { NextApiRequest, NextApiResponse } from 'next'
import { customerAccessTokenCreateMutation } from '@shopify/utils/mutations';

interface CustomerAccessTokenCreateInput {
    email: string
    password: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerAccessTokenCreateInput

    const variables = {
        input: {
            email: body.email,
            password: body.password
        }
    }
    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        customerAccessTokenCreateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
