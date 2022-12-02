
import { checkoutDetailFragment } from "../common"

const checkoutShippingAddressUpdate = `

    mutation checkoutShippingAddressUpdateV2($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
        checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
            checkout {
                ${ checkoutDetailFragment }
            }
            checkoutUserErrors {
                message
            }
        }
    }

`

export default checkoutShippingAddressUpdate