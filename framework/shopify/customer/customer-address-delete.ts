
import { generateApiUrl } from "@shopify/utils"

const customerAddressDelete = async (customerAccessToken: string, addressId: string) => {

    const customerAddressDeleteApiUrl = generateApiUrl({type: "CUSTOMER_ADDRESS_DELETE"})
    const response = await fetch(customerAddressDeleteApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            customerAccessToken: customerAccessToken,
            addressId: addressId
        })
    })

    const { error } = await response.json()
    if(error) {
        throw Error(error.message)
    }
}

export default customerAddressDelete