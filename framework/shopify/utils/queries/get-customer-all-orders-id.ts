

const getCustomerAllOrdersId = `
    query getCustomerAllOrdersId($accessToken: String!) {
        customer(customerAccessToken: $accessToken) {
            orders(first: 100) {
                edges {
                    node {
                        id
                        orderNumber
                    }
                }
            }
        }
    }
`

export default getCustomerAllOrdersId