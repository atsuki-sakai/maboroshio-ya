// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API_URL, ADMIN_ACCESS_TOKEN, ADMIN_API_KEY, ADMIN_API_SECLET } from '@shopify/const'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    const headers = {
        Authorization: 'Basic ' + Buffer.from( ADMIN_API_KEY! + ':' + ADMIN_API_SECLET!).toString('base64'),
        'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    } as any

    const query = `
        mutation {
            customerCreate(input: {email: "headless@sample.com"}) {
            userErrors {
                field
                message
            }
                customer {
                    id
                    email
                }
            }
        }
    `

    const r = await fetch(API_URL!,{
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables: {
                input: {
                    email: "headlessapp@email.com"
                },
            },
        }),
    })

    const json = await r.json()

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(json))
}