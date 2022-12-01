
export const checkoutDetailFragment = `
            id
            email
            shippingAddress{
                id
            }
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
                        quantityAvailable
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
`

