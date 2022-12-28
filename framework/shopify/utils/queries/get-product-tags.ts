

const getProductTags = `
query {
    productTags(first: 10){
        edges{
            cursor
            node
        }
    }
}
`

export default getProductTags