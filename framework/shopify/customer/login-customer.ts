
import { createCustomerAccessToken, checkoutCustomerAssociate } from "@shopify/customer";
import { getCheckoutId } from "@shopify/cart";
import { Checkout, Customer, Maybe } from "@shopify/shema";
import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE, SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from "@shopify/const";

type ReturnType = {
    customer: Customer
    lastInCompleteCheckout: Maybe<Checkout> | undefined
}

const setCustomerAccessToken = (token: string) => {
    const options = {
        expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
    }

    Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, token, options)
}

const loginCustomer = async (email: string, password: string): Promise<ReturnType> => {

    const customerAccessToken = await createCustomerAccessToken(email, password);
    const customer = await checkoutCustomerAssociate(getCheckoutId()!, customerAccessToken.accessToken)

    setCustomerAccessToken(customerAccessToken.accessToken)

    const lastInCompleteCheckout = customer.lastIncompleteCheckout ;
    if(lastInCompleteCheckout){
        Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE!)
        Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE!)

        const options = {
            expires: SHOPIFY_COOKIE_EXPIRE
        }

        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!, lastInCompleteCheckout.id, options)
        Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!, lastInCompleteCheckout.webUrl, options)
    }

    return { customer, lastInCompleteCheckout}
}

export default loginCustomer
