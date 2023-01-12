

import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { searcQueryProductsQuery } from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    const _query = req.query.parameter as any
    const parameters = _query.split("&")
    const cursor = parameters[0].split('=*')[1] ?? ""
    const query = parameters[1].split('=*')[1]
    const type = parameters[2].split('=*')[1]
    const reverse = parameters[3].split('=*')[1]
    const limit = parameters[4].split('=*')[1]


    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        searcQueryProductsQuery(query, cursor, type, reverse, limit)
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ data }))
}
