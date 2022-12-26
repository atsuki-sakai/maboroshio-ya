
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { getCollectionByHandleQuery } from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as { handle: string }
    const variables = {
        handle: body.handle
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        getCollectionByHandleQuery,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
