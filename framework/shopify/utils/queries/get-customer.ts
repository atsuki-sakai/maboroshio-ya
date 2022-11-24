
const getCustomer = `
    query getCustomer($accessToken: String!){
        customer(customerAccessToken: $accessToken) {
            id
            firstName
            lastName
            acceptsMarketing
            email
        }
    }
`

export default getCustomer