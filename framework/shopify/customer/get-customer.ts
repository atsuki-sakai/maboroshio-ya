import { Customer } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils";

const getCustomer =  async (accessToken: string): Promise<Customer> => {
    const getCustomerApiUrl = generateApiUrl({type: "GET_CUSTOMER"});
    const response = await fetch(getCustomerApiUrl!, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            accessToken: accessToken
        })
    })

    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    const customer = data.customer as Customer
    return customer
}

export default getCustomer