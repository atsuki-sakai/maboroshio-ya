
import { Checkout, CheckoutLineItemsUpdatePayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"



interface CheckoutLineItemRemoveType {
    checkoutId: string
    lineItemIds: string[]
}

const checkoutLineItemRemove = async ( { checkoutId, lineItemIds }: CheckoutLineItemRemoveType ): Promise<Checkout> => {

    const checkoutLineItemsUpdateApiUrl = generateApiUrl({type:"CHECKOUT_LINE_ITEMS_UPDATE"})!
    const response = await fetch(checkoutLineItemsUpdateApiUrl, {
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
    console.log("data: ",data)
    const { checkout } =  data.checkoutLineItemsUpdate as CheckoutLineItemsUpdatePayload;
    return checkout as Checkout
}

export default checkoutLineItemRemove