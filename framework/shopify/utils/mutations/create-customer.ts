

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
                code
                message
            }
        }
    }
`

export default createCustomer