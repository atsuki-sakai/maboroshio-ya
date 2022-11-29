import { CustomerDefaultAddressUpdatePayload } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const customerDefaultAddressUpdate = async(addressId: string, customerAccessToken: string) => {

    const customerDefaultAddressUpdateApiUrl = generateApiUrl({type: "CUSTOMER_DEFAULT_ADDRESS_UPDATE"});

    const response = await fetch(customerDefaultAddressUpdateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            addressId: addressId,
            customerAccessToken: customerAccessToken
        })
    })

    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    
    console.log(data)
}

export default customerDefaultAddressUpdate