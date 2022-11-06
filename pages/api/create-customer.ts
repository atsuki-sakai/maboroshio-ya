// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ShopifyApiFeatcher } from '@shopify/api/ShopifyApiFetcher';
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

    let body = await JSON.parse(req.body) as CustomerCreateInput

    // TODO - ここで変換するのは良くない？
    if(body.phone.length === 11 && body.phone.slice(0,1) === "0"){
        body.phone = `+81${body.phone.slice(1)}`
    }

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
