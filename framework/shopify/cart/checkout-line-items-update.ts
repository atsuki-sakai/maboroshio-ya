
import { Checkout, CheckoutLineItemsUpdatePayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"



interface CheckoutLineItemsUpdateType {
    checkoutId: string
    lineItems: {
        id: string
        variantId: string
        quantity: number
    }
}

const checkoutLineItemsUpdate = async ( { checkoutId, lineItems }: CheckoutLineItemsUpdateType ): Promise<Checkout> => {

    const checkoutLineItemsUpdateApiUrl = generateApiUrl({type:"CHECKOUT_LINE_ITEMS_UPDATE"})!
    const response = await fetch(checkoutLineItemsUpdateApiUrl, {
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

    const { checkout } =  data.checkoutLineItemsUpdate as CheckoutLineItemsUpdatePayload;
    return checkout as Checkout
}

export default checkoutLineItemsUpdate