
import { checkoutDetailFragment } from "../common"

const checkoutAttributesUpdate = `
    mutation checkoutAttributesUpdateV2($checkoutId: ID!, $input: CheckoutAttributesUpdateV2Input!) {
        checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
            checkout {
                ${checkoutDetailFragment}
            }
            checkoutUserErrors {
                message
            }
        }
    }
`

export default checkoutAttributesUpdate