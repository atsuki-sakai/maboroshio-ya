

const createCustomer = `
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
            customer{
                id
            }
            customerUserErrors{
                message
            }
        }
    }
`

export default createCustomer