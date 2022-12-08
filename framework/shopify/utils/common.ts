
export const checkoutDetailFragment = `
            id
            email
            shippingAddress{
                id
                address1
                address2
                city
                company
                country
                firstName
                lastName
                province
                phone
                provinceCode
                zip
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

export const orderDetailFragment = `
    id
    subtotalPrice {
        amount
    }
    customerUrl
    email
    fulfillmentStatus
    financialStatus
    processedAt
    orderNumber
    statusUrl
    totalShippingPrice{
        amount
    }
    totalTax {
        amount
    }
    totalPrice {
        amount
    }
    successfulFulfillments{
        trackingCompany
        trackingInfo {
            number
            url
        }
    }
    lineItems(first: 100) {
        edges {
            node {
                quantity
                originalTotalPrice {
                    amount
                }
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
            }
        }
    }
`

export const addressDetailFragment = `
    id
    address1
    address2
    city
    company
    country
    firstName
    lastName
    phone
    province
    zip
`