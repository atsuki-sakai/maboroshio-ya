
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
            customerUserErrors {
                message
            }
        }
    }
`

export default customerDefaultAddressUpdate