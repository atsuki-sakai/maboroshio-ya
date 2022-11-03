

const createCustomer = `
    mutation customerCreate($input: CustomerInput!){
        customerCreate(input: $input) {
            customer {
                email
            }
            userErrors {
                message
            }
        }
    }
`

export default createCustomer