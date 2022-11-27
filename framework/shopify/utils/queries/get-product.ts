
const getProductQuery = `
query productById($slug: String!) {
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
            }
            edges {
                node {
                    id
                    title
                    sku
                    inventoryQuantity
                    selectedOptions {
                        name
                        value
                    }
                    price
                    compareAtPrice
                }
            }
        }
        images(first: 10) {
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


export default getProductQuery