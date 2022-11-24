

const createCustomer = `
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer{
                id
                firstName
                lastName
                acceptsMarketing
                email
            }
            customerUserErrors{
                message
            }
        }
    }
`

export default createCustomer