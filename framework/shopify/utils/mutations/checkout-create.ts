
import { checkoutDetailFragment } from "../common"

const checkoutCreate = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
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
            lineItems(first: 100) {
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

export default checkoutCreate