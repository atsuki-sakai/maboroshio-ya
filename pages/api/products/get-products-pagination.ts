
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { getProductsPagenationQuery } from "@shopify/utils/queries";
import { NextApiRequest, NextApiResponse } from "next";

type ProductsPaginationType = {
    numProducts: number,
    pagination?: {
        type: "NEXT" | "PREVIOUS",
        cursor: string
    }
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as ProductsPaginationType
    const variables = {
        numProducts: body.numProducts,
        pagination: body.pagination && { type: body.pagination.type, cursor: body.pagination.cursor }
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        getProductsPagenationQuery(variables.numProducts, variables.pagination),
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
