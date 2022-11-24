
import { Customer, CustomerAccessTokenCreatePayload } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils/generate-api-url"
import { getCustomer, getCustomerAccessToken } from "@shopify/auth";
import { SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE} from "@shopify/const"
import Cookies from "js-cookie";

const loginCustomer = async (email: string, password: string) => {

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

    if(!getCustomerAccessToken()){
        const options = {
            expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
        }
        Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, customerAccessToken!.accessToken, options)
    }
    const customer = await getCustomer(customerAccessToken!.accessToken);

    return customer

}

export default loginCustomer