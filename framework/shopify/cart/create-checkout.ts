import { generateApiUrl } from "@shopify/utils/generate-api-url"

const createCheckout = async (): Promise<any> => {

    console.log("create checkout")

    const createCheckoutUrl = generateApiUrl({type:"CREATE_CHECKOUT"})
    const response = await fetch(createCheckoutUrl, {
        mode: "no-cors",
        method: "POST"
    })

    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message)
    }

    console.log(data, errors)
    return data;
}

export default createCheckout