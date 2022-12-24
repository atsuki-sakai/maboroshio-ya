
import { Checkout, CheckoutLineItemsRemovePayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"



interface CheckoutLineItemRemoveType {
    checkoutId: string
    lineItemIds: string[]
}

const checkoutLineItemRemove = async ( { checkoutId, lineItemIds }: CheckoutLineItemRemoveType ): Promise<Checkout> => {

    const checkoutLineItemsRemoveApiUrl = generateApiUrl({type:"CHECKOUT_LINE_ITEMS_REMOVE"})!
    const response = await fetch(checkoutLineItemsRemoveApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId,
            lineItemIds: lineItemIds
        })
    })

    const { data, errors } = await response.json();

    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }
    const { checkout } =  data.checkoutLineItemsRemove as CheckoutLineItemsRemovePayload;
    return checkout as Checkout
}

export default checkoutLineItemRemove