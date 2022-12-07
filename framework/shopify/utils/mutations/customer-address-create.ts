import { addressDetailFragment } from "../common"


const customerAddressCreate = `
    mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
        customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
            customerAddress {
                ${ addressDetailFragment }
            }
            customerUserErrors {
                message
            }
        }
    }
`

export default customerAddressCreate