
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { getOrdersPaginationQuery} from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

type ProductsPaginationType = {
    first: number
    accessToken: string
    cursor: string | null
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as ProductsPaginationType
    const variables = {
        first: body.first,
        accessToken: body.accessToken,
        cursor: body.cursor
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        getOrdersPaginationQuery,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
