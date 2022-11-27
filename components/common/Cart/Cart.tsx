
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useUI, useCart } from '@components/context'
import { motion } from 'framer-motion';
import Image from 'next/image';
import style from "./Cart.module.css"
import { LineItem } from '@shopify/types/cart';
import { Close } from '@components/icon';
import CartCard from './CartCard';
import RightArrow from '@components/icon/RightArrow';
import { getCheckoutId } from '@shopify/cart';
import Check from '@components/icon/Check';


const Cart = () => {

    const { isCartOpen, onCartClose } = useUI();
    const { cart } = useCart()
    const shippingFreeCost = 10000
    const shippingFree = (shippingFreeCost - cart.totalPrice) > 0

    const cartTotalQuantity = () => cart.lineItems.map((item: LineItem) => item.quantity).reduce((sum, element) => sum + element, 0)

    return (
            <motion.div
                initial={{ x:"100%", opacity:0.0 }}
                animate={{ x: isCartOpen ? "0%" : "100%", opacity: isCartOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.6" }}
                className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto z-50"
            >
                <div className="w-screen h-screen">
                    <div className='grid grid-cols-6 h-full'>
                        <div className={`col-span-1 h-full transition duration-300 ease-in-out ${isCartOpen ? "bg-black bg-opacity-50": ""}`} onClick={onCartClose} />
                        <div className='col-span-5 h-full bg-white rounded-tl-md rounded-bl-md p-3'>
                            <div className='flex items-center justify-between bg-gray-700 shadow-md rounded-md px-3 py-2'>
                                <h3 className=' text-white'>お客様のカート</h3>
                                <div className='bg-white rounded-md'>
                                    <button className='flex items-center text-gray-800 px-3 py-1' onClick={onCartClose}>
                                        <span className='text-xs font-bold'>カートを閉じる</span><RightArrow className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <div className='w-full flex items-center justify-end rounded-md text-center'>
                                    {
                                        shippingFree ? <p className='bg-indigo-100 text-xs text-indigo-600 rounded-md px-2 py-0.5'>あと<span className='text-base font-bold'>¥{shippingFreeCost - cart.totalPrice}</span>で<span className='text-sm font-bold'>送料無料</span></p> : <div className='bg-green-100 flex items-center space-x-2 px-3 py-1 rounded-md'><Check className='text-green-500 w-5 h-5'/><span className='text-green-500 text-sm font-bold'>送料無料</span></div>
                                    }
                                </div>
                                <div className='grid grid-cols-7 items-end justify-between mt-2 py-2 px-2 rounded-md bg-gray-100'>
                                    <div className="col-span-4 text-gray-500 text-sm font-noto">
                                        合計 <span className="font-sans text-black text-3xl">¥{Math.floor(cart.totalPrice)}</span>
                                    </div>
                                    <div className='col-span-3'>
                                        <p className='text-sm text-end text-gray-500'><span className='text-lg font-semibold text-black'>{cartTotalQuantity()}</span> 点の商品</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-1 flex items-center justify-end'>
                                {
                                    shippingFree ? <p className='text-xs text-blue-600 bg-blue-100 w-fit rounded-md px-3 py-1'>送料は次のステップで計算されます</p> : <></>
                                }
                            </div>
                            <div className='flex justify-center mt-3'>
                                <a href={'/api/cart/checkout'} className={`bg-gradient-to-tl to-green-600 from-lime-500 shadow-md w-full py-2 rounded-md`}>
                                    <p className='text-white text-lg font-bold text-center tracking-wider'>
                                        商品を購入する
                                    </p>
                                </a>
                            </div>
                            <div>
                                cart:
                                {
                                    JSON.stringify(cart, null, 2)
                                }
                            </div>
                            <div className=' overflow-y-auto my-5 p-1'>
                                    {
                                        cart.lineItems.length === 0
                                        ? <div>
                                            <p className='py-6 text-center font-bold text-gray-400'>カート内に商品はありません</p>
                                        </div>
                                        : cart.lineItems.map((item: LineItem) => {
                                            return <CartCard key={item.id} product={item}/>
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}

export default Cart