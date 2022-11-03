// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SHOPIFY_ADMIN_API_URL, SHOPIFY_ADMIN_ACCESS_TOKEN, SHOPIFY_ADMIN_API_KEY, SHOPIFY_ADMIN_API_SECLET_KEY } from '@shopify/const'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data: any
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    const headers = {
        Authorization: 'Basic ' + Buffer.from( SHOPIFY_ADMIN_API_KEY! + ':' + SHOPIFY_ADMIN_API_SECLET_KEY!).toString('base64'),
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    } as any


    const query = `
        mutation checkoutCreate($input: CheckoutCreateInput = {}){
            checkoutCreate(input: $input) {
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

    const response = await fetch(SHOPIFY_ADMIN_API_URL!,{
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
    res.status(200).json({data: data})
}