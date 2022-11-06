
import { Customer, CustomerCreatePayload } from "@shopify/shema"
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
    const response = await fetch(createCustomerApiUrl, {
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
    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }
    return data.customerCreate as CustomerCreatePayload;
}

export default createCustomer