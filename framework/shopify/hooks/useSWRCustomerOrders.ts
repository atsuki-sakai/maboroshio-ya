
import { SWRConfiguration } from "swr";
import useSWRInfinite from "swr/infinite"
import type { Order, PageInfo } from "@shopify/shema";
import { generateApiUrl } from "@shopify/utils";
import { useEffect, useState } from "react";
import { useCustomerState } from "@components/context";
import { getCustomerAccessToken } from "@shopify/customer";
import { numberToStar } from "@lib/number-to-star";

interface SWRCustomerOrdersStore {
    orders: Order[]
    isLast: boolean
    error: Error
    fetcher: () => Promise<any>
    loadMoreCustomerOrders: () => void
}

const Limit = 4
const getOrdersApiUrl = generateApiUrl({type: "GET_ORDERS_PAGINATION"})
const token = getCustomerAccessToken()

const useSWRCustomerOrders = () => {

    const { loggedCustomer } = useCustomerState()
    const [ prevOrdersPageInfo, setPrevOrdersPageInfo ] = useState<PageInfo>()

    const getKey = (pageIndex: number, previousPageData: Order[]) => {
        if(previousPageData && !previousPageData.length) return null
        return [getOrdersApiUrl, pageIndex, Limit, token, prevOrdersPageInfo?.endCursor]
    }

    const ordersInfoFeatcher = async(url: string, pageIndex: number, limit: number, token?: string,  cursor?: string): Promise<any> => {
        const response = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                numOrders: limit,
                accessToken: token,
                cursor: cursor
            })
        }).then((res) => {
            return res.json()
        }).catch((e) => {
            throw Error(e.message)
        })
        setPrevOrdersPageInfo(response.data.customer.orders.pageInfo)
        console.log(response.data.customer.orders.edges.map((edge: any) => edge.node.totalPrice.amount))
        return response.data.customer.orders.edges.map((edge: any) => edge.node)
    }

    const { data, error, size, setSize } = useSWRInfinite(getKey, ordersInfoFeatcher)

    const loadMoreOrders = () => {
        setSize(size + 1)
    }

    const isLast = data ? data.filter(list => list.length < Limit).length > 0 : false
    const orders = data ? data.flat(): null

    return {
        orders,
        isLast,
        error,
        ordersInfoFeatcher,
        loadMoreOrders
    }
}

export default useSWRCustomerOrders