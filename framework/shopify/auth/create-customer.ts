
import { CustomerCreatePayload } from "@shopify/shema"
import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCustomer = async (
        email: string,
        password: string,
        acceptsMarketing: boolean,
        firstName: string,
        lastName: string,
        phone: string
    ): Promise<any> => {
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
    const json = await response.json();
    console.log("data: ",json)
    return json;
}

export default createCustomer