
import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { customerAddressUpdateMutation } from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";

type CustomerAddressUpdateInputType = {
    address: {
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
    },
    customerAccessToken: string,
    addressId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerAddressUpdateInputType

    const variables = {
        address: {
            address1: body.address.address1,
            address2: body.address.address2,
            city: body.address.city,
            company: body.address.company,
            country: body.address.country,
            firstName: body.address.firstName,
            lastName: body.address.lastName,
            phone: body.address.phone,
            province: body.address.province,
            zip: body.address.zip
        },
        customerAccessToken: body.customerAccessToken,
        id: body.addressId
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        customerAddressUpdateMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}