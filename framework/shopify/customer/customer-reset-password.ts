import { generateApiUrl } from "@shopify/utils/generate-api-url"

const customerResetPassword = async(customerId: string, password: string, resetToken: string) => {

    const customerResetPasswordApiUrl = generateApiUrl({type: "CUSTOMER_RESET_PASSWORD"})
    const response = await fetch(customerResetPasswordApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            id: customerId,
            input: {
                password: password,
                resetToken: resetToken
            }
        })
    })

    const { data, error } = await response.json()

    if(error){
        throw Error(error.message)
    }

    console.log("data: ",data)
}

export default customerResetPassword