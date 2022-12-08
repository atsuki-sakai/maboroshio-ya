import { Order } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"

const getOrder = async(orderId: string):Promise<Order> => {

    const getOrderApiUrl = generateApiUrl({type: "GET_ORDER"})
    const response = await fetch(getOrderApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            orderId: orderId
        })
    })

    const { data, error } = await response.json()
    if(error) {
        throw Error(error.message)
    }
    const order = data.node as Order
    return order
}

export default getOrder