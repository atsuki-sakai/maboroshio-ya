

const customerAddressUpdate = `
    mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
        customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
            customerAddress {
                id
            }
            customerUserErrors {
                message
            }
        }
    }
`

export default customerAddressUpdate