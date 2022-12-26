
const getCollectionByHandle = `
    query getCollectionByHandle($handle: String!){
        collectionByHandle(handle: $handle){
            title
            description
            handle
            products(first: 10, reverse: true, sortKey: CREATED) {
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
    }
`

export default getCollectionByHandle