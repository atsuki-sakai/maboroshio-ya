

import { orderDetailFragment } from "../common"

const getOrdersPagination = `
    query getCustomerOrders($accessToken: String!, $first: Int! , $cursor: String){
        customer(customerAccessToken: $accessToken) {
            orders(first: $first, after: $cursor, reverse: true, sortKey: PROCESSED_AT) {
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