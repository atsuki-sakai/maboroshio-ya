
import { getCustomer, createCustomerAccessToken } from "@shopify/auth";
import { Customer, CustomerAccessToken } from "@shopify/shema";

type ReturnType = {
    customer: Customer,
    customerAccessToken: CustomerAccessToken
}

const loginCustomer = async (email: string, password: string): Promise<ReturnType> => {
    const customerAccessToken = await createCustomerAccessToken(email, password);
    const customer = await getCustomer(customerAccessToken.accessToken)
    return { customer, customerAccessToken };
}

export default loginCustomer