
import { ApiFeacher } from "@shopify/types/api"
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from "@shopify/const"
import { CheckoutCreatePayload, Checkout, Maybe } from "@shopify/shema"
import { checkoutCreateMutation } from "@shopify/utils/mutations"
import Cookies from "js-cookie"

const createCheckout = async (fetch: ApiFeacher<{checkoutCreate: CheckoutCreatePayload}>): Promise<Maybe<Checkout | undefined>> => {
    const { data } = await fetch({
        query: checkoutCreateMutation
    })
    const { checkout } = data.checkoutCreate;
    const checkoutId = checkout?.id

    if(checkoutId){
        // 90日でCookieを破棄する
        const options = {
            expires: SHOPIFY_COOKIE_EXPIRE
        }
        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE!, checkoutId, options)
        Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE!,  checkout?.webUrl, options)
    }
    return checkout
}

export default createCheckout