

const customerAccessTokenCreate = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
        customerAccessToken {
            accessToken
        }
        customerUserErrors {
            message
        }
    }
}
`

export default customerAccessTokenCreate