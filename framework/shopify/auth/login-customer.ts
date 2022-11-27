
import { createCustomerAccessToken, checkoutCustomerAssociate } from "@shopify/auth";
import { getCheckoutId } from "@shopify/cart";
import { Customer, CustomerAccessToken } from "@shopify/shema";

type ReturnType = {
    customer: Customer,
    customerAccessToken: CustomerAccessToken
}

const loginCustomer = async (email: string, password: string): Promise<ReturnType> => {

    console.log('2')
    const customerAccessToken = await createCustomerAccessToken(email, password);
    console.log('3')
    console.log(getCheckoutId()!, customerAccessToken.accessToken)
    const customer = await checkoutCustomerAssociate(getCheckoutId()!, customerAccessToken.accessToken)
    console.log('4')
    return { customer, customerAccessToken };
}

export default loginCustomer