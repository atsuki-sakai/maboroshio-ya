

const getProductTypes = `
    query {
        productTypes(first: 6){
            edges{
                cursor
                node
            }
        }
    }
`

export default getProductTypes