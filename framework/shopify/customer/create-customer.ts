
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from "@shopify/const"
import { CustomerCreatePayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"
import { createCustomerAccessToken, getCustomerAccessToken  } from "@shopify/customer"
import Cookies from "js-cookie"

const createCustomer = async (
        email: string,
        password: string,
        acceptsMarketing: boolean,
        firstName: string,
        lastName: string
    ): Promise<CustomerCreatePayload> => {

    const createCustomerApiUrl = generateApiUrl({type:"CREATE_CUSTOMER"})!
    const response = await fetch(createCustomerApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: email,
            password: password,
            acceptsMarketing: acceptsMarketing,
            firstName: firstName,
            lastName: lastName
        })
    })
    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }

    const accessToken = await createCustomerAccessToken(email, password);
    if(!getCustomerAccessToken()){
        const options = {
            expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
        }
        Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, accessToken.accessToken, options)
    }
    return data.customerCreate as CustomerCreatePayload;
}

export default createCustomer