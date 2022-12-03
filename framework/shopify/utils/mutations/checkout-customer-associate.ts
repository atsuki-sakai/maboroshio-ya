import { checkoutDetailFragment } from "../common"

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
                    id
                    address1
                    address2
                    city
                    company
                    country
                    firstName
                    lastName
                    phone
                    province
                    zip
                }
                addresses(first: 5){
                    edges {
                        node {
                            id
                            address1
                            address2
                            city
                            company
                            country
                            firstName
                            lastName
                            phone
                            province
                            zip
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
        }
    }
`
export default checkoutCustomerAssociate