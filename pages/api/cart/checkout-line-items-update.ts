
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutLineItemsUpdateMutation} from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";



export interface CheckoutLineItemsUpdateType {
    checkoutId: string
    lineItems: {
        lineId: string
        variantId: string
        quantity: number
    }
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CheckoutLineItemsUpdateType
    const variables = {
        checkoutId: body.checkoutId,
        lineItems: body.lineItems
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutLineItemsUpdateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
