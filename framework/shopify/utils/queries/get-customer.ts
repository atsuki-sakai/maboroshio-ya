import { checkoutDetailFragment } from "../common"

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
`

export default getCustomer