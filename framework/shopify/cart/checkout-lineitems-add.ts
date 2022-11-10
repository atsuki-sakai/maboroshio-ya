
import { CustomerCreatePayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"



interface CheckoutLineItemsAddType {
    checkoutId: string,
    lineItems: {
        variantId: string,
        quantity: number
    }
}

const checkoutLineItemsAdd = async ( { checkoutId, lineItems }: CheckoutLineItemsAddType ): Promise<any> => {

    const checkoutLineItemsAddApiUrl = generateApiUrl({type:"CHECKOUT_LINEITEMS_ADD"})!
    const response = await fetch(checkoutLineItemsAddApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId,
            lineItems: lineItems
        })
    })
    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }
    console.log("data: ",data)
    return data;
}

export default checkoutLineItemsAdd