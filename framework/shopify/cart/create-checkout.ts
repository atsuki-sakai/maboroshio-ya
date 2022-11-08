import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from "@shopify/const"
import { Checkout, CheckoutCreatePayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"
import Cookies from "js-cookie"

const createCheckout = async (): Promise<Checkout> => {

    const createCheckoutUrl = generateApiUrl({type:"CREATE_CHECKOUT"})
    const response = await fetch(createCheckoutUrl, {
        mode: "no-cors",
        method: "POST"
    })

    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message)
    }

    const { checkout, checkoutUserErrors } = data.createCheckout as CheckoutCreatePayload;
    if(checkoutUserErrors){
        throw Error(checkoutUserErrors[0]?.message)
    }

    const checkoutId = checkout?.id;

    if(checkoutId){
        const options = {
            expires: SHOPIFY_COOKIE_EXPIRE
        }
        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!, checkoutId, options)
        Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!, checkout?.webUrl, options)
    }
    return checkout as Checkout;
}

export default createCheckout