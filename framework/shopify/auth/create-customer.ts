
import { CustomerCreatePayload } from "@shopify/shema"
import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCustomer = async (email: string): Promise<any> => {
    console.log("create customer api @shopfy/auth ",)
    const createCustomerApiUrl = generateAdminApiPath({type:"CREATE_CUSTOMER"})!
    const  response = await fetch(createCustomerApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: email
        })
    })
    const json  = await response.json();
    console.log("json data :",json.data)
    console.log("json",json)
    console.log("JSON.stringfy: ",JSON.stringify(json))


    console.log("customerCreate",json.data.customerCreate)
    const payload = json.data.customerCreate
    return payload
}

export default createCustomer