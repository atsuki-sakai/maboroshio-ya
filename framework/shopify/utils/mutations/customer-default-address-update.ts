
const customerDefaultAddressUpdate = `
    mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
        customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
            customer {
                id
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
            }
            customerUserErrors {
                message
            }
        }
    }
`

export default customerDefaultAddressUpdate