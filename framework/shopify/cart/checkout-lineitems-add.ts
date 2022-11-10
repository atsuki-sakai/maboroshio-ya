
import { Checkout, CheckoutLineItemsAddPayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"



interface CheckoutLineItemsAddType {
    checkoutId: string,
    lineItems: {
        variantId: string,
        quantity: number
    }
}

const checkoutLineItemsAdd = async ( { checkoutId, lineItems }: CheckoutLineItemsAddType ): Promise<Checkout> => {

    const checkoutLineItemsAddApiUrl = generateApiUrl({type:"CHECKOUT_LINEITEMS_ADD"})!
    const response = await fetch(checkoutLineItemsAddApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId,
            lineItems: lineItems
        })
    })

    console.log("0")
    const { data, errors } = await response.json();
    console.log("1")
    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }
    console.log('2')
    const { checkout } =  data.checkoutLineItemsAdd as CheckoutLineItemsAddPayload;
    return checkout as Checkout
}

export default checkoutLineItemsAdd