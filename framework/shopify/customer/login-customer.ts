
import { createCustomerAccessToken, checkoutCustomerAssociate, getCustomerAccessToken } from "@shopify/customer";
import { checkoutToCart, getCheckoutId } from "@shopify/cart";
import { Checkout, Customer, CustomerAccessToken } from "@shopify/shema";
import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE, SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from "@shopify/const";
import { Cart } from "@shopify/types/cart";
import { Check } from "@components/icon";

type ReturnType = {
    customer: Customer,
    customerAccessToken: CustomerAccessToken
    checkout: Checkout | undefined
}

const loginCustomer = async (email: string, password: string): Promise<ReturnType> => {

    const customerAccessToken = await createCustomerAccessToken(email, password);
    const customer = await checkoutCustomerAssociate(getCheckoutId()!, customerAccessToken.accessToken)

    let checkout: Checkout | undefined
    if(customer.lastIncompleteCheckout){
        console.log('update checkout.')
        const options = {
            expires: SHOPIFY_COOKIE_EXPIRE
        }
        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!, customer.lastIncompleteCheckout.id, options)
        Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!, customer.lastIncompleteCheckout.webUrl, options)
        checkout = customer.lastIncompleteCheckout as Checkout
    }
    const options = {
        expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
    }
    Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, customerAccessToken.accessToken, options)
    return { customer, customerAccessToken, checkout }
}

export default loginCustomer
