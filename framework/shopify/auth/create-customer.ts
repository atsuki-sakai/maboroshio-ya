
import { CustomerCreatePayload } from "@shopify/shema"
import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCustomer = async (email: string): Promise<CustomerCreatePayload> => {
    const createCustomerApiUrl = generateAdminApiPath({type:"CREATE_CUSTOMER"})!
    const  response = await fetch(createCustomerApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: email
        })
    })
    const { data } = await response.json();
    const payload = data.customerCreate as CustomerCreatePayload
    return payload;
}

export default createCustomer