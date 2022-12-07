import { checkoutDetailFragment, addressDetailFragment, orderDetailFragment } from "../common"

const checkoutCustomerAssociate = `
    mutation checkoutCustomerAssociate($checkoutId: ID!, $customerAccessToken: String!) {
        checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            checkout {
                ${ checkoutDetailFragment }
            }
            checkoutUserErrors {
                message
            }
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
                            ${ orderDetailFragment }
                        }
                    }
                }
            }
        }
    }
`
export default checkoutCustomerAssociate