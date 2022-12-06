import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { customerUpdateMutation } from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";


type CustomerUpdateInputType = {
    customer: {
        acceptsMarketing: boolean
        email: string
        firstName: string
        lastName: string
    },
    customerAccessToken: string
}


export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerUpdateInputType

    const variables = {
        customer: {
            acceptsMarketing: body.customer.acceptsMarketing,
            email: body.customer.email,
            firstName: body.customer.firstName,
            lastName: body.customer.lastName
        },
        customerAccessToken: body.customerAccessToken
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        customerUpdateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
