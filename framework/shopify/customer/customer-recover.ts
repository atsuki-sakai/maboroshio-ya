import { CustomerRecoverPayload } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const customerRecover = async(email: string) => {

    const customerRecoverApiUrl = generateApiUrl({type: "CUSTOMER_RECOVER"})
    const response = await fetch(customerRecoverApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            email: email
        })
    })

    const { data, error } = await response.json()
    if(error){
        throw Error(error.message)
    }
    const { customerUserErrors } =  data.customerRecover as CustomerRecoverPayload
    if(customerUserErrors[0]){
        throw Error(customerUserErrors[0].message)
    }
}

export default customerRecover