
const customerAddressDelete = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
        customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
            customerUserErrors {
                message
            }
            deletedCustomerAddressId
        }
    }
`

export default customerAddressDelete