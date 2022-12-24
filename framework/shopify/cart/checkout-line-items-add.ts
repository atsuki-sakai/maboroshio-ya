
import { Checkout, CheckoutLineItemsAddPayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"



interface CheckoutLineItemsType {
    checkoutId: string,
    lineItems: {
        variantId: string,
        quantity: number
    }
}

const checkoutLineItemsAdd = async ( { checkoutId, lineItems }: CheckoutLineItemsType ): Promise<Checkout> => {

    const checkoutLineItemsAddApiUrl = generateApiUrl({type:"CHECKOUT_LINE_ITEMS_ADD"})!
    const response = await fetch(checkoutLineItemsAddApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId,
            lineItems: lineItems
        })
    })

    const { data, errors } = await response.json();
    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }
    const { checkout } =  data.checkoutLineItemsAdd as CheckoutLineItemsAddPayload;
    return checkout as Checkout
}

export default checkoutLineItemsAdd