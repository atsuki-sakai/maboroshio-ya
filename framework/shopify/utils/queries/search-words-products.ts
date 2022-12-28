


const wordsToQuery = (words: string[], onlyTitle: boolean = false) => {
    const queryList =  words.map((word, index) => {
        if(index === 0){
            return `(${onlyTitle ? `title:${word}*`: `${word}*`})`
        }else{
            return ` OR (${onlyTitle ? `title:${word}*`: `${word}*`})`
        }
    })
    return queryList.reduce((sum, value) => sum += value)
}

const searchWordsProducts = (titleOnly: boolean, text: string): string => {
    const words = text.split(/(\s+)/).filter( e => e.trim().length > 0)
    return `
        {
            products(first: 10, query: "${wordsToQuery(words, titleOnly)}"){
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

export default searchWordsProducts