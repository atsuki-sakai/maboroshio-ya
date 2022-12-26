
import { Order } from "@shopify/shema"
import { generateApiUrl } from "@shopify/utils"

const getOrdersPagenation = async(numOrders: number, accessToken: string, cursor?: string) => {

    const getOrdersPaginationApiUrl = generateApiUrl({type: "GET_ORDERS_PAGINATION"})
    const response = await fetch(getOrdersPaginationApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            first: numOrders,
            accessToken: accessToken,
            cursor: cursor ? cursor : null
        })
    })
    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }

    return data.customer.orders
}

export default getOrdersPagenation