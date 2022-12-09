
import React, { useEffect, useState } from 'react'
import { Container } from '@components/ui'
import { useCustomerState } from "@components/context"
import { Order } from '@shopify/shema'

const OrderId = () => {

    const { loggedCustomer } = useCustomerState()
    const [order, setOrder] = useState<Order | undefined>()

    useEffect(() => {
        const orderNumber = document.location.pathname.split('orders/')[1]
        if(loggedCustomer?.orders){
            loggedCustomer.orders.edges.map(({node: order}) => {
                if(orderNumber === String(order.orderNumber)){
                    setOrder(order)
                }
            })
        }
    },[loggedCustomer])

    if(!order){
        return  <Container>
                    <div className='flex items-center justify-center'>
                        <p>Order is undifined...</p>
                    </div>
                </Container>
    }

    return (
        <div>
            {
                JSON.stringify(order, null, 2)
            }
        </div>
    )
}

export default OrderId