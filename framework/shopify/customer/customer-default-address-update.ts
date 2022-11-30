import { Customer, CustomerDefaultAddressUpdatePayload } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const customerDefaultAddressUpdate = async(addressId: string, customerAccessToken: string): Promise<Customer> => {

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

    const { customer, customerUserErrors } = data.customerDefaultAddressUpdate as CustomerDefaultAddressUpdatePayload
    if(customerUserErrors[0]){
        throw Error(customerUserErrors[0].message)
    }
    if(!customer){
        throw Error('customer is not defined...');
    }
    return customer
}

export default customerDefaultAddressUpdate