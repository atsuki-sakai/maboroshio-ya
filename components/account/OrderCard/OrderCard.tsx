
import { Order } from '@shopify/shema'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface Props {
    order: Order
}
const placeholderImage = "/images/product-image-placeholder.svg"

const fulfillmentToJp = (status: string) => {

    switch(status){
        case "FULFILLED" : {
            return "発送済み"
        }
        case "IN_PROGRESS" : {
            return "処理中"
        }
        case "ON_HOLD" || "PENDING_FULFILLMENT" : {
            return "保留中"
        }
        case "PARTIALLY_FULFILLED" : {
            return "一部発送済み"
        }
        case "SCHEDULED" : {
            return "発送予定"
        }
        case "UNFULFILLED" || "RESTOCKD" || "OPEN" : {
            return "未発送"
        }
        default : {
            return "ERROR"
        }
    }
}

const financialStatus = (states: string ) => {
    
    switch(states){
        case "AUTHORIZED": {
            return "認可済み"
        }
        case "PAID": {
            return "支払い済み"
        }
        case "PARTIALLY_PAID": {
            return "一部支払い済み"
        }
        case "PARTIALLY_REFUNDED": {
            return "一部返金済み"
        }
        case "PENDING": {
            return "未払い"
        }
        case "REFUNDED": {
            return "返金済み"
        }
        case "VOIDED": {
            return "無効"
        }
        default : {
            return "ERROR"
        }
    }
}

const OrderCard = ({order}: Props) => {
    const firstItem = order.lineItems.edges[0].node.variant

    return (
        <div className='border rounded-md'>
            <Link
                as={`/customer/orders/${order.orderNumber}`}
                href={{pathname:`/customer/orders/${order.orderNumber}`, query: {orderId: encodeURIComponent(order.id) } as any }}
                passHref
            >
                <a>
                    <div className='relative h-full w-full rounded-md overflow-hidden'>
                        <Image
                            src={firstItem?.image?.url ?? placeholderImage}
                            width={firstItem?.image?.width ?? "320"}
                            height={firstItem?.image?.height ?? "180"}
                            alt={firstItem?.image?.altText ?? "Product Image"}
                        />
                        <div className='p-1'>
                            <p className='text-xs text-gray-500 mb-1'>注文番号 <span className='font-bold'>{order.orderNumber}</span></p>
                            <div className='flex items-center justify-between'>
                                <div className='border border-green-500 rounded-full w-fit px-2 py-0.5'>
                                    <p className='text-xs scale-90 text-green-500'>{fulfillmentToJp(order.fulfillmentStatus)}</p>
                                </div>
                                <div className='border border-blue-500 rounded-full w-fit px-2 py-0.5'>
                                    <p className='text-xs scale-90 text-blue-500'>{financialStatus(order.financialStatus!)}</p>
                                </div>
                            </div>
                            <p className="text-base mt-1 w-full">
                                ¥ { Math.floor(order.totalPrice.amount) }
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default OrderCard


