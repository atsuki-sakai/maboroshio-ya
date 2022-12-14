
const productConnect = `
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
`

// TODO: - 100を超えるとgraphqlのコストを超えてエラーを吐く
const getAllProductsQuery = `
query getAllProducts($first: Int = 20) {
    products(first: $first) {
        ${productConnect}
    }
}
`

export default getAllProductsQuery