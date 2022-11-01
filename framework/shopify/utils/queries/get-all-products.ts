
const productConnect = `
pageInfo {
    hasNextPage
    hasPreviousPage
}
edges {
    node {
        id
        title
        vendor
        handle
        description
        totalInventory
        priceRangeV2 {
            minVariantPrice {
                amount
                currencyCode
            }
        }
        images(first: 1) {
            pageInfo {
            hasNextPage
            hasPreviousPage
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
query getAllProducts($first: Int = 100) {
    products(first: $first) {
        ${productConnect}
    }
}
`

export default getAllProductsQuery