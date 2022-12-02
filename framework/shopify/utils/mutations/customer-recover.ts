
const customerRecover = `
    mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
            customerUserErrors {
                message
            }
        }
    }
`
export default customerRecover