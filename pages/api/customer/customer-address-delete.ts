
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { customerAddressDeleteMutation} from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";

type CustomerAddressDeleteInputType = {
    customerAccessToken: string
    addressId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerAddressDeleteInputType

    const variables = {
        customerAccessToken: body.customerAccessToken,
        id: body.addressId
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        customerAddressDeleteMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}