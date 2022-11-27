
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutLineItemRemoveMutation} from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";



export interface CheckoutLineItemsRemoveType {
    checkoutId: string
    lineItemIds: string[]
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CheckoutLineItemsRemoveType
    const variables = {
        checkoutId: body.checkoutId,
        lineItemIds: body.lineItemIds
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutLineItemRemoveMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
