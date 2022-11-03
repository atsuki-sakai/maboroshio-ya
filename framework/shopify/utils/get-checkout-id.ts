
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@shopify/const";
import Cookies from "js-cookie"


const getCheckoutId = () => {
    console.log("framework/shopify/utils/get-checkout-id.ts")
    return Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE!);
}

export default getCheckoutId