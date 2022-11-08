import { Checkout } from "@shopify/shema";
import { generateApiUrl } from "./generate-api-url";

const getCheckout = async(id: string): Promise<Checkout> => {

    const getCheckoutApiUrl = generateApiUrl({type: "GET_CHECKOUT"})

    const response = await fetch(getCheckoutApiUrl, {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify({
            id: id
        })
    });
    const { data } = await response.json();
    const checkout = data.node as Checkout

    return checkout;
}

export default getCheckout