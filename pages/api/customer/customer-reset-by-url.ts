import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { customerResetByUrlMutation } from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";

type CustomerResetPasswordByUrlType = {
    password: string
    resetUrl: string
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerResetPasswordByUrlType

    const variables = {
        password: body.password,
        resetUrl: body.resetUrl
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        customerResetByUrlMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}