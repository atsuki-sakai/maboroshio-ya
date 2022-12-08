
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@components/ui';
import type { Order } from '@shopify/shema';
import { getOrder } from '@shopify/customer';


const OrderDetail = () => {

    const router = useRouter();
    const query = router.query as any;
    const orderId = query.id as string
    const [ order, setOrder ] = useState<Order>()

    useEffect(() => {

        ( async() => {
            const order = await getOrder(orderId)
            setOrder(order)
        }) ()
    }, [orderId])

    if(!order) {
        return  <div className="h-screen w-screen">
                    <div className='flex items-center justify-center'>
                        <p>Loading now...</p>
                    </div>
                </div>
    }
    return (
        <Container>
            <div className='px-8'>
                {
                    JSON.stringify(order, null, 2)
                }
                {/* <p className='text-xs text-gray-500 mb-1'>注文番号 <span className='font-bold'>{order.orderNumber}</span></p>
                <p className='text-xs text-gray-500 mb-1'>注文日 <span className='font-bold'>{order.processedAt}</span></p> */}
            </div>
        </Container>
    )
}

export default OrderDetail
