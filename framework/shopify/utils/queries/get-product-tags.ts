

const getProductTags = `
query {
    productTags(first: 6){
        edges{
            cursor
            node
        }
    }
}
`

export default getProductTags