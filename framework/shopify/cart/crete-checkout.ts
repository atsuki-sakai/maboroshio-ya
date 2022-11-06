import { generateAdminApiPath } from "@shopify/utils/generate-admin-api-path"

const createCheckout = async () => {

    const createCheckoutUrl = generateAdminApiPath({type:"CREATE_CHECKOUT"})
    const response = await fetch(createCheckoutUrl, {
        mode: "no-cors",
        method: "POST"
    })

    const { data, errors } = await response.json()
    if(errors){
        throw Error(errors[0]?.message ?? errors[0].message)
    }

    console.log(data, errors)
    return data;
}

export default createCheckout