
import { generateApiUrl } from "@shopify/utils"

const getCustomerAllOrdersId = async(accessToken: string): Promise<{id: string, orderNumber: number}[]> => {

    const getCustomerAllOrdersIdApiUrl = generateApiUrl({type: "GET_CUSTOMER_ALL_ORDERS_ID"})
    const response = await fetch(getCustomerAllOrdersIdApiUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            accessToken: accessToken,
        })
    })
    const { data, error } = await response.json();
    if(error){
        throw Error(error.message)
    }

    return data.customer.orders.edges.map((edge: any) => edge.node)
}

export default getCustomerAllOrdersId