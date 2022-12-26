
const getAllCollections = `
    query getCollections($first: Int!){
        collections(first:$first, reverse: true){
            edges{
                node{
                    title
                    description
                    handle
                    id
                    image{
                        url
                    }
                }
            }
        }
    }
`

export default getAllCollections