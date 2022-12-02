
import { Checkout, CheckoutShippingAddressUpdateV2Payload, MutationCheckoutShippingLineUpdateArgs } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"
import { add } from "cheerio/lib/api/traversing"


type Address =  {
        address1: string
        address2: string
        city: string
        company: string
        country: string
        firstName: string
        lastName: string
        phone: string
        province: string
        zip: string
    }


const checkoutShippingAddressUpdate = async(checkoutId: string, address?: Address ): Promise<Checkout> => {

    const checkoutShippingAddressUpdateApiUrl = generateApiUrl({type: "CHECKOUT_SHIPPING_ADDRESS_UPDATE"})

    const response = await fetch(checkoutShippingAddressUpdateApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            checkoutId: checkoutId,
            shippingAddress: {
                address1: address?.address1 ?? "",
                address2: address?.address2 ?? "",
                city: address?.city ?? "",
                company: address?.company ?? "",
                country: address?.country ?? "",
                firstName: address?.firstName ?? "",
                lastName: address?.lastName ?? "",
                phone: address?.phone ?? "",
                province: address?.province ?? "",
                zip: address?.zip ?? ""
            }
        })
    })

    const { data, error } = await response.json()

    if(error){
        throw Error(error.message)
    }

    const { checkout } = data as CheckoutShippingAddressUpdateV2Payload
    return checkout as Checkout
}

export default checkoutShippingAddressUpdate