import { checkoutDetailFragment, addressDetailFragment, orderDetailFragment } from "../common"

const customerUpdate = `
    mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
        customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
            customer {
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
                            ${ orderDetailFragment } 
                        }
                    }
                }
            }
            customerAccessToken {
                accessToken
            }
            customerUserErrors {
                message
            }
        }
    }
`

export default customerUpdate