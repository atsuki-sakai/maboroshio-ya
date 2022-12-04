

const customerResetByUrl = `

    mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
        customerResetByUrl(password: $password, resetUrl: $resetUrl) {
            customer {
                id
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

export default customerResetByUrl
