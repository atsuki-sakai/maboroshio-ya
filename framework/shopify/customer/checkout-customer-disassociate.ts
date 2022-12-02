
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const checkoutCustomerDisassociate = async(checkoutId: string) => {
    const checkoutCustomerDisassociateApiUrl = generateApiUrl({type: "CHECKOUT_CUSTOMER_DISASSOCIATE"})
    const response = await fetch(checkoutCustomerDisassociateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId
        })
    })

    const { error } = await response.json();
    if(error){
        throw Error(error.message)
    }
}

export default checkoutCustomerDisassociate