import { generateApiUrl } from "@shopify/utils/generate-api-url"

const customerResetByUrl = async(password: string, resetUrl: string) => {

    const customerResetByUrl = generateApiUrl({type: "CUSTOMER_RESET_BY_URL"})
    const response = await fetch(customerResetByUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            password: password,
            resetUrl: resetUrl
        })
    })
    const { error } = await response.json()
    if(error){
        throw Error(error.message)
    }
}

export default customerResetByUrl