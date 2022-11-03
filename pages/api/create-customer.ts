// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ADMIN_ACCESS_TOKEN, ADMIN_API_KEY, ADMIN_API_SECLET_KEY, API_URL } from '@shopify/const'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    const body = JSON.parse(req.body) as { email: string }

    const headers = {
        Authorization:
        'Basic ' +
        Buffer.from(
            ADMIN_API_KEY! +
            ':' +
            ADMIN_API_SECLET_KEY!
        ).toString('base64'),
        'X-Shopify-Access-Token':
        ADMIN_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    } as any

    const query = `
        mutation {
            customerCreate(input: { email: "sakai-yasutomo@sample.com" }) {
                customer {
                    email
                }
                userErrors {
                    message
                }
            }
        }
    `

    const r = await fetch(
        API_URL!,
        {
        method: 'POST',
        mode: "no-cors",
        headers,
        body: JSON.stringify({
            query
        }),
    })

    const json = await r.json()

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(json))
}
