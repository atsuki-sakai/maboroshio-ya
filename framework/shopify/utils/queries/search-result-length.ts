

//最大100件

const searchResultLength = (query: string): string => {
    return `
        {
            products(first: 100, query: "${query}"){
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `
}

export default searchResultLength