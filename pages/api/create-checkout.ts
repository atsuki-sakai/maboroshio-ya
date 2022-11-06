import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutCreateMutation } from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";




export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutCreateMutation,
        {
            input: {}
        }
        )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
