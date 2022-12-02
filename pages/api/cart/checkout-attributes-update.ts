

import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { checkoutAttributesUpdateMutation} from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";



export interface CheckoutAttributesUpdateType {
    checkoutId: string,
    input: {
        allowPartialAddresses: boolean
        customAttributes: {
            key: string
            value: string
        }
    },
    note: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CheckoutAttributesUpdateType
    const variables = {
        checkoutId: body.checkoutId,
        input: {
            allowPartialAddresses: body.input.allowPartialAddresses,
            customAttributes: [
                {
                    key: body.input.customAttributes.key,
                    value: body.input.customAttributes.value
                }
            ]
        },
        note: body.note
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        checkoutAttributesUpdateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
