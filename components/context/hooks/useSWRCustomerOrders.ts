
import { getCustomerAccessToken } from "@shopify/customer";
import { Order } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils";
import { SWRConfiguration } from "swr";

interface SWRCustomerOrdersStore {
    orders: Order[],
    isLast: boolean,
    error: Error,
    fetcher: (url: string, pageIndex: number, limit: number) => Promise<any>,
    loadMoreOrders: () => void
}

const ordersLimit = 4
const getCustomerOrdersPagiantionApiUrl = generateApiUrl({type: "GET_ORDERS_PAGINATION"})

export const useSWRCustomerOrders = (configg: SWRConfiguration) => {


    // const getKey = (pageIndex: number, previousPageData: Order[]) => {
    //     if(previousPageData && !previousPageData.length) return null
    //     if(pageIndex === 0) return [getCustomerOrdersPagiantionApiUrl, ordersLimit, getCustomerAccessToken()!, initialOrdersPagination?.endCursor]
    //     return [getOrdersPaginationApiUrl, numberOfOrders, getCustomerAccessToken()!, ordersPagination ? ordersPagination.endCursor : null]
    // }

}