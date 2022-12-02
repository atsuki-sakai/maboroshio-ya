

const customerResetPassword = `

    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
        customerReset(id: $id, input: $input) {
            customer {
                # Customer fields
            }
            customerAccessToken {
                # CustomerAccessToken fields
            }
            customerUserErrors {
                # CustomerUserError fields
            }
        }
    }
`

export default customerResetPassword