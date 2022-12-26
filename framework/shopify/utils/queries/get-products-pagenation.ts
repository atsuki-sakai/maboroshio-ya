
type PaginationType = {
    type: "PREVIOUS" | "NEXT",
    cursor: string
}


const getProductsPagenation = ( numProducts: number, pagination?: PaginationType) => `
    query{
        products(
            ${ pagination ?  pagination.type === "NEXT"
                                        ? `first: ${numProducts}, after: "${pagination.cursor}", reverse: true, sortKey: CREATED_AT`
                                        : `last: ${numProducts}, before: "${pagination.cursor}" , reverse: true, sortKey: CREATED_AT`
                            : `first: ${numProducts} , reverse: true, sortKey: CREATED_AT`}
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    id
                    title
                    vendor
                    handle
                    description
                    totalInventory
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    images(first: 1) {
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                            startCursor
                            endCursor
                        }
                        edges {
                            node {
                                url
                                altText
                                width
                                height
                            }
                        }
                    }
                    variants(first: 1) {
                        edges {
                            node {
                                title
                                sku
                                quantityAvailable
                                selectedOptions {
                                    name
                                    value
                                }
                                price{
                                    amount
                                }
                                compareAtPrice {
                                    amount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default getProductsPagenation
