import { checkoutDetailFragment } from "../common"

const checkoutCustomerAssociate = `
    mutation checkoutCustomerAssociate($checkoutId: ID!, $customerAccessToken: String!) {
        checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            checkout {
                ${checkoutDetailFragment}
            }
            checkoutUserErrors {
                message
            }
            customer {
                id
                firstName
                lastName
                acceptsMarketing
                email
            }
        }
    }
`
export default checkoutCustomerAssociate