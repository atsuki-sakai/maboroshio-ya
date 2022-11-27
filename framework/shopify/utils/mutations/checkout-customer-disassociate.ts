import { checkoutDetailFragment } from "../common"

const checkoutCustomerDisassociate = `
    mutation checkoutCustomerDisassociateV2($checkoutId: ID!) {
        checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
            checkout {
                ${checkoutDetailFragment}
            }
            checkoutUserErrors {
                message
            }
        }
    }
`

export default checkoutCustomerDisassociate