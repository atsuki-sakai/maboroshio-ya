


//query = (黒豆*) (variants.price:>3000)
//querys = ["(黒豆*)", "(にんじん*)"]

const searcQueryProducts = (query: string, cursor: string, reverse?: boolean): string => {
    const r = reverse !== undefined ? reverse : true
    return `
        {
            products(first: 10, query: "${query}"${ cursor !== "" ? `, after:"${cursor}"` : "" }${`, reverse: ${r}` }){
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
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    `
}

export default searcQueryProducts