import { checkoutDetailFragment } from "../common"

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