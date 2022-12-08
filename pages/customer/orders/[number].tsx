
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@components/ui';
import type { Order } from '@shopify/shema';
import { getOrder } from '@shopify/customer';


const OrderDetail = () => {

    const router = useRouter();
    const query = router.query as any;

    console.log(query)
    return (
        <Container>
            <div className='px-8'>
                {/* <p className='text-xs text-gray-500 mb-1'>注文番号 <span className='font-bold'>{order.orderNumber}</span></p>
                <p className='text-xs text-gray-500 mb-1'>注文日 <span className='font-bold'>{order.processedAt}</span></p> */}
            </div>
        </Container>
    )
}

export default OrderDetail
