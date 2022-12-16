
const getProductQuery = `
query productHandle($slug: String!) {
    productByHandle(handle: $slug) {
        id
        handle
        title
        vendor
        description
        descriptionHtml
        totalInventory
        options {
            id
            name
            values
        }
        priceRange {
            minVariantPrice {
                amount
                currencyCode
            }
        }
        variants(first: 10) {
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
        images(first: 10) {
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


export default getProductQuery