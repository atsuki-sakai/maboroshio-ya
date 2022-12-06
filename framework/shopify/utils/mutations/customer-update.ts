
const customerUpdate = `
    mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
        customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
            customer {
                id
                firstName
                lastName
                acceptsMarketing
                email
            }
            customerAccessToken {
                accessToken
            }
            customerUserErrors {
                message
            }
        }
    }
`

export default customerUpdate