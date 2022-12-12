
import React, { useEffect, useState } from 'react'
import { Container } from '@components/ui'
import { useCustomerState } from "@components/context"
import { Order } from '@shopify/shema'
import { financialStatusToJp }  from "@lib/finacial-status-to-jp"
import { fulfillmentToJp } from '@lib/fulfillment-status-to-jp'
import Image from 'next/image'
import provinceToJP from '@lib/province-to-jp'

const placeholderImage = "/images/product-image-placeholder.svg"

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
                        <div className='h-screen w-screen flex justify-center'>Order is undifined...</div>
                    </div>
                </Container>
    }

    return (
        <Container>
            <div className='px-8'>
                <div className='flex items-center justify-between mb-3'>
                    <p className='text-sm font-bold'>注文番号 <span className=''>{order.orderNumber}</span></p>
                    <p className='text-xs text-gray-500'>注文日 <span className=''>{order.processedAt.split('T')[0]}</span></p>
                </div>
                <div className='text-sm font-bold'>
                    <p className='text-xs font-normal text-gray-500'>合計注文数 {order.lineItems.edges.length}点</p>
                    <div className='grid grid-cols-4 gap-2 mt-5'>
                        <div>
                            <p>小計</p>
                            <p className='text-gray-500 font-normal'>¥{Math.floor(order.subtotalPrice.amount)}</p>
                        </div>
                        <div>
                            <p>送料</p>
                            <p className='text-gray-500 font-normal'>¥{Math.floor(order.totalShippingPrice.amount)}</p>
                        </div>
                        <div>
                            <p>税</p>
                            <p className='text-gray-500 font-normal'>¥{Math.floor(order.totalTax.amount)}</p>
                        </div>
                        <div>
                            <p>合計金額</p>
                            <p className='text-gray-500 font-normal'>¥{Math.floor(order.totalPrice.amount)}</p>
                        </div>
                    </div>
                </div>
                <div className='py-3 '>
                    {
                        order.lineItems.edges.map(({node: lineItem}, index) => {
                            return  <div key={index} className="border p-2 rounded-md">
                                        <div className='relative'>
                                            <Image src={lineItem.variant?.image?.url ?? placeholderImage} width={lineItem.variant?.image?.width ?? 350} height={lineItem.variant?.image?.height ?? 350} alt={lineItem.variant?.image?.altText ?? "Product Image"}  />
                                        </div>
                                        <p className='my-2 font-bold'>{lineItem.title}</p>
                                        <table className="table-auto w-full border text-left p-3 text-sm">
                                            <thead>
                                                <tr>
                                                    <th>小計</th>
                                                    <th className='border-l border-r'>数量</th>
                                                    <th>合計</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-left border-t text-xs'>
                                                <tr>
                                                    <td>{Math.floor(lineItem.variant?.price.amount)}</td>
                                                    <td className='border-l border-r'>{Math.floor(lineItem.quantity)}</td>
                                                    <td>{lineItem.variant?.price.amount * lineItem.quantity}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                        })
                    }
                </div>
                <div className='pt-6 pb-12'>
                    <p className='font-bold text-sm  mb-2'>配達住所</p>
                    <div className='text-xs text-gray-500'>
                        <p>{order.shippingAddress?.country === "Japan" ? "日本" : "海外"}</p>
                        <p>{order.shippingAddress?.zip}</p>
                        <p>{provinceToJP(order.shippingAddress?.province!)}{order.shippingAddress?.city}{order.shippingAddress?.address1}{order.shippingAddress?.address2}</p>
                    </div>
                    <p className='font-bold text-sm mb-2 mt-4'>支払い情報</p>
                    <div className='text-xs text-gray-500'>
                        <p>{financialStatusToJp(order.financialStatus!)}</p>
                    </div>
                    <p className='font-bold text-sm mb-2 mt-4'>発送情報</p>
                    <div className='text-xs text-gray-500'>
                        {
                            order.successfulFulfillments![0] ?  <div>
                                                                <div className='flex items-center space-x-3'>
                                                                    <p>{order.successfulFulfillments![0].trackingCompany}</p>
                                                                    <p>追跡番号 {order.successfulFulfillments![0].trackingInfo[0].number}</p>
                                                                </div>
                                                                <button className='mt-2'>
                                                                    <a className='text-blue-500 underline' href={order.successfulFulfillments![0].trackingInfo[0].url}>
                                                                        商品を追跡する
                                                                    </a>
                                                                </button>
                                                            </div> : "未発送"
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default OrderId