
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { getOrdersPaginationQuery} from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

type ProductsPaginationType = {
    numOrders: number
    accessToken: string
    pagination?: {
        type: "NEXT" | "PREVIOUS",
        cursor: string
    }
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as ProductsPaginationType
    const variables = {
        numOrders: body.numOrders,
        accessToken: body.accessToken,
        pagination: body.pagination && { type: body.pagination.type, cursor: body.pagination.cursor }
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        getOrdersPaginationQuery(variables.numOrders, variables.accessToken, variables.pagination),
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
