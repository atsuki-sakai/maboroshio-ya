
type PaginationType = {
    type: "PREVIOUS" | "NEXT",
    cursor: string
}


const getProductsPagenation = ( numProducts: number, pagination?: PaginationType) => `
    query{
        products(${pagination ?  pagination.type === "NEXT" ? `first: ${numProducts}, after: "${pagination.cursor}"`: `last: ${numProducts}, before: "${pagination.cursor}"` : `first: ${numProducts}`} ) {
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
                }
            }
        }
    }
`

export default getProductsPagenation
