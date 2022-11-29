

const customerAddressCreate = `
    mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
        customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
            customerAddress {
                id
                address1
                address2
                city
                company
                country
                firstName
                lastName
                province
                phone
                provinceCode
                zip
            }
            customerUserErrors {
                message
            }
        }
    }
`

export default customerAddressCreate