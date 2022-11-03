

const createCustomer = `
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer{
                email
                acceptsMarketing
                firstName
                lastName
                phone
            }
            customerUserErrors{
                message
            }
        }
    }
`

export default createCustomer