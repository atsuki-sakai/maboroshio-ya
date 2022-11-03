
import { CustomerCreatePayload } from "@shopify/shema"
import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCustomer = async (email: string): Promise<CustomerCreatePayload> => {
    console.log("create customer api @shopfy/auth ",)
    const createCustomerApiUrl = generateAdminApiPath({type:"CREATE_CUSTOMER"})!
    const  response = await fetch(createCustomerApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: email
        })
    })
    const { data } = await response.json();
    console.log("json data :",data)
    console.log("data",data)
    console.log("JSON.stringfy: ",JSON.stringify(data))


    console.log("customerCreate",data.customerCreate)
    const payload = data.customerCreate
    return payload as CustomerCreatePayload
}

export default createCustomer