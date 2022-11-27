import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutCustomerDisassociateMutation } from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";

export interface CheckoutCustomerDisassociateType {
    checkoutId: string,
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CheckoutCustomerDisassociateType
    const variables = {
        checkoutId: body.checkoutId
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutCustomerDisassociateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
