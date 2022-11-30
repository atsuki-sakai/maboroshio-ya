
import { createCustomerAccessToken, checkoutCustomerAssociate } from "@shopify/customer";
import { getCheckoutId } from "@shopify/cart";
import { Customer, CustomerAccessToken } from "@shopify/shema";

type ReturnType = {
    customer: Customer,
    customerAccessToken: CustomerAccessToken
}

const loginCustomer = async (email: string, password: string): Promise<ReturnType> => {

    const customerAccessToken = await createCustomerAccessToken(email, password);
    const customer = await checkoutCustomerAssociate(getCheckoutId()!, customerAccessToken.accessToken)
    return { customer, customerAccessToken };
}

export default loginCustomer