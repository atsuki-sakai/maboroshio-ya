import { addressDetailFragment, orderDetailFragment } from "../common"

const customerDefaultAddressUpdate = `
    mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
        customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
            customer {
                id
                firstName
                lastName
                acceptsMarketing
                email
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
            customerUserErrors {
                message
            }
        }
    }
`

export default customerDefaultAddressUpdate