
import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCustomer = async (email: string) => {
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
    return json
}

export default createCustomer