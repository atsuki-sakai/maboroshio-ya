

import { orderDetailFragment } from "../common"

type PaginationType = {
    type: "PREVIOUS" | "NEXT",
    cursor: string
}

const getOrdersPagination = (numOrders: number, accessToken: string, pagination?: PaginationType)  => `
    query {
        customer(customerAccessToken: "${accessToken}") {
            orders(${pagination ?  pagination.type === "NEXT" ? `first: ${numOrders}, after: "${pagination.cursor}", sortKey: PROCESSED_AT, reverse: true`: `last: ${numOrders}, before: "${pagination.cursor}"` : `first: ${numOrders}, sortKey: PROCESSED_AT, reverse: true`} ) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                edges {
                    node {
                        ${orderDetailFragment}
                    }
                }
            }
        }
    }
`

export default getOrdersPagination