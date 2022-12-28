

import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { searchWordsProductsQuery } from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");
    const body = JSON.parse(req.body) as { titleOnly: boolean, text: string }
    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        searchWordsProductsQuery(body.titleOnly, body.text)
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
