
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutShippingAddressUpdateMutation} from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";

export interface CheckoutShippingAddressUpdateType {
    checkoutId: string
    shippingAddress: {
        address1: string
        address2: string
        city: string
        company: string
        country: string
        firstName: string
        lastName: string
        phone: string
        province: string
        zip: string
    }
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CheckoutShippingAddressUpdateType
    const variables = {...body}

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutShippingAddressUpdateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
