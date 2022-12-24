
import React, { useEffect, useState } from 'react'
import { Container } from '@components/ui'
import { Order } from '@shopify/shema'
import { financialStatusToJp }  from "@lib/finacial-status-to-jp"
import Image from 'next/image'
import provinceToJP from '@lib/province-to-jp'
import { fulfillmentToJp } from '@lib/fulfillment-status-to-jp'
import Link from 'next/link'
import { getOrder } from '@shopify/customer'
import useSWR from 'swr'
import { generateApiUrl } from '@shopify/utils/generate-api-url'
import { getCheckoutId } from '@shopify/cart'
import { useRouter } from 'next/router'

const placeholderImage = "/images/product-image-placeholder.svg"


const OrderId = () => {

    const router = useRouter()

    const encodeOrderId:string = router.query.id as any
    const getOrderApiUrl = generateApiUrl({type: "GET_ORDER"})
    const orderFetcher = (url: string, orderId: string): Promise<any> => fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            orderId: orderId
        })
    }).then((res) => {
        return res.json()
    }).catch((e) => {
        throw Error(e.message)
    })

    const { data: orderSWR, error } = useSWR([getOrderApiUrl, decodeURIComponent(encodeOrderId)], router.isReady ? orderFetcher: null)

    console.log('data: ', orderSWR?.data.node ?? "undifined")
    useEffect(() => {
    },[router.isReady])

    if(error){
        return  <Container>
                    <div className='flex items-center justify-center'>
                        <div className='h-[520px] w-screen'>
                            <div className='flex justify-center items-center h-full'>
                                <p className='text-gray-500 text-xl'>{error.messages}</p>
                            </div>
                        </div>
                    </div>
                </Container>
    }

    if(!orderSWR){
        return  <Container>
                    <div className='flex items-center justify-center'>
                        <div className='h-[520px] w-screen'>
                            <div className='flex justify-center items-center h-full'>
                                <p className='text-gray-500 text-xl'>読み込み中...</p>
                            </div>
                        </div>
                    </div>
                </Container>
    }

    return (
        <Container>
            <div className='px-8'>
                <div className='flex items-end justify-between mb-3'>
                    <p className='text-xl font-bold'>注文番号  #<span className=''>{orderSWR.data.node.orderNumber}</span></p>
                    <p className='text-xs text-gray-500'>注文日 <span className=''>{orderSWR.data.node.processedAt.split('T')[0]}</span></p>
                </div>
                <div className='text-sm shadow-sm pt-3'>
                    <p className='text-sm font-normal text-gray-500'>合計注文数 <span className='text-2xl text-black'>{orderSWR.data.node.lineItems.edges.map((edge: any) => edge.node.quantity).reduce((sum, value) => sum += value)}</span> 点</p>
                    <div className='grid grid-cols-4 gap-2 mt-5 bg-blue-100 px-3 py-1 text-blue-500 rounded-md'>
                        <div>
                            <p>小計</p>
                            <p className='text-blue-500 font-bold mt-1'>¥{Math.floor(orderSWR.data.node.subtotalPrice.amount)}</p>
                        </div>
                        <div>
                            <p>送料</p>
                            <p className='text-blue-500 font-bold mt-1'>¥{Math.floor(orderSWR.data.node.totalShippingPrice.amount)}</p>
                        </div>
                        <div>
                            <p>税</p>
                            <p className='text-blue-500 font-bold mt-1'>¥{Math.floor(orderSWR.data.node.totalTax.amount)}</p>
                        </div>
                        <div>
                            <p>合計金額</p>
                            <p className='text-blue-500 font-bold mt-1'>¥{Math.floor(orderSWR.data.node.totalPrice.amount)}</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-start justify-between pb-2'>
                    <div>
                        <p className='font-bold text-sm mb-2 mt-4'>支払い情報</p>
                        <div className='text-xs text-gray-500'>
                            <p className='text-green-500'>{financialStatusToJp(orderSWR.data.node.financialStatus!)}</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-bold text-sm mb-2 mt-4'>発送情報</p>
                        <p className='text-xs mb-1 text-green-500'>{fulfillmentToJp(orderSWR.data.node.fulfillmentStatus)}</p>
                        <div className='text-xs text-gray-500'>
                            {
                                orderSWR.data.node.successfulFulfillments![0] ?  <div>
                                                                    <div className='flex items-center'>
                                                                        <p className='pr-2'>{orderSWR.data.node.successfulFulfillments![0].trackingCompany ?? "指定無し"}</p>
                                                                        <p>{orderSWR.data.node.successfulFulfillments![0].trackingInfo[0] ? <a className='text-blue-500 underline' href={orderSWR.data.node.successfulFulfillments![0].trackingInfo[0] ? orderSWR.data.node.successfulFulfillments![0].trackingInfo[0].url : "/" }>{orderSWR.data.node.successfulFulfillments![0].trackingInfo[0].number}</a> : "追跡番号無し"}</p>
                                                                    </div>
                                                                </div> : "未発送"
                            }
                        </div>
                    </div>
                </div>
                <div className='py-3 '>
                    {
                        orderSWR.data.node.lineItems.edges.map(({node: lineItem}, index) => {
                            return  <div key={index} className="border p-2 shadow-sm rounded-md mb-3">
                                        <Link href={`/products/${lineItem.variant?.product.handle}`} passHref>
                                            <a>
                                                <div className='relative'>
                                                    <Image src={lineItem.variant?.image?.url ?? placeholderImage} width={lineItem.variant?.image?.width ?? 350} height={lineItem.variant?.image?.height ?? 350} alt={lineItem.variant?.image?.altText ?? "Product Image"}  />
                                                </div>
                                            </a>
                                        </Link>
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
                                                    <td>¥{Math.floor(lineItem.variant?.price.amount)}</td>
                                                    <td className='border-l border-r'>{Math.floor(lineItem.quantity)}点</td>
                                                    <td>¥{lineItem.variant?.price.amount * lineItem.quantity}</td>
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
                        <p>{orderSWR.data.node.shippingAddress?.lastName}{orderSWR.data.node.shippingAddress?.firstName}</p>
                        <p>{orderSWR.data.node.shippingAddress?.country === "Japan" ? "日本" : "海外"}</p>
                        <p>{orderSWR.data.node.shippingAddress?.zip}</p>
                        <p>{provinceToJP(orderSWR.data.node.shippingAddress?.province!)}{orderSWR.data.node.shippingAddress?.city}{orderSWR.data.node.shippingAddress?.address1}{orderSWR.data.shippingAddress?.address2}</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default OrderId