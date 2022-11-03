// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdminApiHeaders } from '@shopify/api/AdminApiHeaders';
import { API_URL } from '@shopify/const'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createCustomerMutation } from '@shopify/utils/mutations';


interface CustomerCreateInput {
    email: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    // TODO: - mode:"no-cors"
    if(req.method !== "POST") throw Error("request is GET? this api is only POST!!!");
    const body = await JSON.parse(req.body) as CustomerCreateInput
    const response = await fetch(
        API_URL!,
        {
        method: 'POST',
        mode: "no-cors",
        headers: AdminApiHeaders,
        body: JSON.stringify({
            query: createCustomerMutation,
            variables: {
                input: {
                    email: body.email
                }
            }
        }),
    })
    const data = await response.json()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
