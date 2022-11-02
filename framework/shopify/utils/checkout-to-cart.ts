
import { Checkout, Maybe } from "@shopify/shema"
import { normalizeCart } from "./normarize";

const checkoutToCart = (checkout: Maybe<Checkout> | undefined) => {
    if(!checkout) {
        throw new Error("Missing checkout object!")
    }
    return normalizeCart(checkout);
}

export default checkoutToCart