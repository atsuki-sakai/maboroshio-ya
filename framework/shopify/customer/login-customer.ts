
import { createCustomerAccessToken, checkoutCustomerAssociate, getCustomerAccessToken } from "@shopify/customer";
import { checkoutToCart, getCheckout, getCheckoutId } from "@shopify/cart";
import { Checkout, Customer, CustomerAccessToken } from "@shopify/shema";
import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE, SHOPIFY_CUSTOMER_ACCESS_TOKEN, SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE } from "@shopify/const";
import { Cart } from "@shopify/types/cart";
import { Check } from "@components/icon";

type ReturnType = {
    customer: Customer,
    checkout: Checkout | undefined
}
const updateCustomerCheckoutCookies = (checkout: Checkout) => {

    const options = {
        expires: SHOPIFY_COOKIE_EXPIRE
    }

    Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE!)
    Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE!)
    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!, checkout.id, options)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!, checkout.webUrl, options)

}

const loginCustomer = async (email: string, password: string): Promise<ReturnType> => {

    const customerAccessToken = await createCustomerAccessToken(email, password);
    const customer = await checkoutCustomerAssociate(getCheckoutId()!, customerAccessToken.accessToken)

    let checkout: Checkout | undefined
    if(customer.lastIncompleteCheckout){

        checkout = customer.lastIncompleteCheckout as Checkout
        updateCustomerCheckoutCookies(checkout)
    }

    const options = {
        expires: SHOPIFY_CUSTOMER_ACCESS_TOKEN_EXPIRE
    }

    Cookies.set(SHOPIFY_CUSTOMER_ACCESS_TOKEN!, customerAccessToken.accessToken, options)

    return { customer, checkout }
}

export default loginCustomer
