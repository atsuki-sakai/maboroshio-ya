import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutLineItemsAddMutation} from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";

export interface CheckoutLineItemsType {
    checkoutId: string,
    lineItems: {
        variantId: string,
        quantity: number
    }
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CheckoutLineItemsType
    const variables = {
        checkoutId: body.checkoutId,
        lineItems: body.lineItems
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutLineItemsAddMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
