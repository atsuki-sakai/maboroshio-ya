import { ShopifyApiFeatcher } from "@shopify/api/ShopifyApiFetcher";
import { customerRecoverMutation } from "@shopify/utils/mutations";
import { NextApiRequest, NextApiResponse } from "next";


type CustomerResetPasswordType = {
    id: string
    input: {
        password:string
        resetToken: string
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");

    let body = await JSON.parse(req.body) as CustomerResetPasswordType

    const variables = {
        id: body.id,
        input: {
            password: body.input.password,
            resetToken: body.input.resetToken
        }
    }

    const response = await ShopifyApiFeatcher(
        {type:"STOREFRONT_API"},
        customerRecoverMutation,
        variables
    )

    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}