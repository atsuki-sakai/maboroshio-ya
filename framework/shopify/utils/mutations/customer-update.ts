import { checkoutDetailFragment, addressDetailFragment } from "../common"

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
                orders(first: 10) {
                    edges {
                        node {
                            id
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