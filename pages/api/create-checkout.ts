// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API_URL, ADMIN_ACCESS_TOKEN, ADMIN_API_KEY, ADMIN_API_SECLET_KEY } from '@shopify/const'
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

    const headers = {
        Authorization: 'Basic ' + Buffer.from( ADMIN_API_KEY! + ':' + ADMIN_API_SECLET_KEY!).toString('base64'),
        'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    } as any

    const query = `
        mutation {
            checkoutCreate(input: {}) {
                checkoutUserErrors {
                    field
                    message
                }
                checkout {
                    id
                    webUrl
                    subtotalPrice {
                        amount
                        currencyCode
                    }
                    totalTax {
                    amount
                    currencyCode
                    }
                    totalPrice {
                    amount
                    currencyCode
                    }
                    completedAt
                    createdAt
                    taxesIncluded
                    lineItems(first: 250) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                        id
                        title
                        variant {
                            id
                            sku
                            title
                            selectedOptions {
                                name
                                value
                            }
                            image {
                                url
                                altText
                                width
                                height
                            }
                            price {
                                amount
                                currencyCode
                            }
                            compareAtPrice {
                                amount
                                currencyCode
                            }
                            product {
                                handle
                            }
                        }
                        quantity
                        }
                    }
                }
            }
        }
    }
    `

    const response = await fetch(API_URL!,{
        mode: "no-cors",
        method: 'POST',
        headers,
        body: JSON.stringify({
            query
        })
    })

    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message ?? errors?.message)
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(json))
}