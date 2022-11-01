
const getProductQuery = `
query productById($slug: String!) {
    productByHandle(handle: $slug) {
        id
        handle
        title
        vendor
        description
        descriptionHtml
        options {
            id
            name
            values
        }
        priceRangeV2 {
            minVariantPrice {
                amount
                currencyCode
            }
            maxVariantPrice {
                amount
                currencyCode
            }
        }
        variants(first: 250) {
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                    id
                    title
                    sku
                    selectedOptions {
                        name
                        value
                    }
                    price
                    compareAtPrice
                }
            }
        }
        images(first: 250) {
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