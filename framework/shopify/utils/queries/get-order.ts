
import { orderDetailFragment } from "../common"

const getOrder = `
    query getOrder($orderId: ID!){
        node(id: $orderId) {
            ... on Order {
                ${ orderDetailFragment }
            }
        }
    }
`

export default getOrder