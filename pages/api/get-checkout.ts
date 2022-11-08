import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { getCheckoutQuery } from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");


    let body = await JSON.parse(req.body) as { id: string }

    const variables = {
        checkoutId: body.id
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        getCheckoutQuery,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
