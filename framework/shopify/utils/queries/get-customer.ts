import { checkoutDetailFragment, orderDetailFragment, addressDetailFragment } from "../common"

const getCustomer = `
    query getCustomer($accessToken: String!){
        customer(customerAccessToken: $accessToken) {
            id
            firstName
            lastName
            acceptsMarketing
            email
            lastIncompleteCheckout {
                ${ checkoutDetailFragment }
            }
            defaultAddress {
                ${ addressDetailFragment }
            }
            addresses(first: 5){
                edges {
                    node {
                        ${ addressDetailFragment }
                    }
                }
            }
            orders(first: 4) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                edges {
                    node {
                        ${orderDetailFragment}
                    }
                }
            }
        }
    }
`

export default getCustomer