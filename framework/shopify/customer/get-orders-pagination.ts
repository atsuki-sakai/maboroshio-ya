
import { Order } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils/generate-api-url"

type PaginationType = {
    type: "NEXT" | "PREVIOUS",
    cursor: string
}

const getOrdersPagenation = async(numOrders: number, accessToken: string, pagination?: PaginationType) => {

    const getOrdersPaginationApiUrl = generateApiUrl({type: "GET_ORDERS_PAGINATION"})
    const response = await fetch(getOrdersPaginationApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            numOrders: numOrders,
            accessToken: accessToken,
            pagination: pagination
        })
    })
    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }
    return data.customer.orders
}

export default getOrdersPagenation