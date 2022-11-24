import { CustomerAccessTokenCreatePayload, CustomerAccessToken } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils/generate-api-url";

const createCustomerAccessToken = async(email: string, password: string): Promise<CustomerAccessToken> => {

    const customerAccessTokenCreateApiPath = generateApiUrl({type: "CUSTOMER_ACCESS_TOKEN_CREATE"});
    const response = await fetch(customerAccessTokenCreateApiPath!, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email,
            password
        })
    });

    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }
    const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate as CustomerAccessTokenCreatePayload

    if(customerUserErrors[0]){
        throw Error(customerUserErrors[0].message)
    }
    return customerAccessToken as CustomerAccessToken
}

export default createCustomerAccessToken