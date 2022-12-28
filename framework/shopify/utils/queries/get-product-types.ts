

const getProductTypes = `
    query {
        productTypes(first: 10){
            edges{
                cursor
                node
            }
        }
    }
`

export default getProductTypes