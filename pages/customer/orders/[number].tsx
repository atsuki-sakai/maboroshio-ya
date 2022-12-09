
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@components/ui';
import type { Order } from '@shopify/shema';
import { getOrder } from '@shopify/customer';
import { useCustomerState } from "@components/context"
import { GetStaticProps } from 'next';



const OrderDetail = () => {

    const router = useRouter()
    const { loggedCustomer } = useCustomerState()
    const orderNumber = router.asPath.split('orders/')[1]
    let choiceOrder
    useEffect(() => {
        if(orderNumber){
            loggedCustomer?.orders.edges.map(({node: order}) => {
                choiceOrder = order.orderNumber.toString() === orderNumber.toString()
            })
        }
    },[orderNumber])



    return (
        <Container>
            <div className='px-8'>
                {
                    JSON.stringify(choiceOrder, null, 2)
                }
                {/* <p className='text-xs text-gray-500 mb-1'>注文番号 <span className='font-bold'>{order.orderNumber}</span></p>
                <p className='text-xs text-gray-500 mb-1'>注文日 <span className='font-bold'>{order.processedAt}</span></p> */}
            </div>
        </Container>
    )
}



export default OrderDetail
