
import { CustomerCreatePayload } from "@shopify/shema"
import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCustomer = async (
        email: string,
        password: string,
        acceptsMarketing: boolean,
        firstName: string,
        lastName: string,
        phone: string
    ): Promise<CustomerCreatePayload> => {
    const createCustomerApiUrl = generateAdminApiPath({type:"CREATE_CUSTOMER"})!
    const  response = await fetch(createCustomerApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: email,
            password: password,
            acceptsMarketing: acceptsMarketing,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        })
    })
    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    console.log("data: ",data)
    return data;
}

export default createCustomer