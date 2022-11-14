
import React, { useEffect } from 'react'
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


const Cart = () => {

    const { isCartOpen, onCartClose } = useUI();
    const { cart, updateCart } = useCart()
    console.log("cart: ",cart)


    const minusLineItem = (productId: string) => {
        const newCart = cart;
        newCart.lineItems.map((item: LineItem) => {
            if(productId === item.id){
                item.quantity -= 1;
            }
        })
        updateCart(newCart)
    }

    const cartTotalQuantity = () => cart.lineItems.map((item: LineItem) => item.quantity).reduce((sum, element) => sum + element, 0)
    const test = () => {
        cart.lineItems.map((item) => {
            console.log(item)
        })
        console.log(cart)
    }
    console.log(getCheckoutId())
    return (
            <motion.div
                initial={{ x:"100%", opacity:0.0 }}
                animate={{ x: isCartOpen ? "0%" : "100%", opacity: isCartOpen ? 1.0 : 0.0 }}
                transition={{ duration:"0.7" }}
                className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto z-50"
            >
                <div className="w-screen h-screen">
                    <div className='grid grid-cols-6'>
                        <div className={`col-span-1 h-full transition duration-300 ease-in-out ${isCartOpen ? "bg-black bg-opacity-50": ""}`} onClick={onCartClose} />
                        <div className='col-span-5 h-full bg-white rounded-tl-md rounded-bl-md p-3'>
                            <div className='flex items-center justify-between bg-gray-700 rounded-md px-3 py-2'>
                                <h3 className=' text-white'>お客様のカート</h3>
                                <div className='bg-white rounded-md'>
                                    <button className='flex items-center text-black px-3 py-1' onClick={() => test()}>
                                        <span className='text-xs'>カートを閉じる</span><RightArrow className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className='flex items-end justify-between mt-4'>
                                <div className="text-base font-noto border-b">
                                    合計  <span className="font-sans text-2xl">¥{Math.floor(cart.totalPrice)}</span><span className="text-sm"> 税込</span>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500'><span className='text-base font-semibold'>{cartTotalQuantity()}</span> 個の商品</p>
                                </div>
                            </div>
                            <div className='flex justify-center my-4'>
                                <div className='bg-gradient-to-tl to-green-600 from-lime-500 shadow-md w-full py-2 rounded-md' onClick={() => console.log('購入')}>
                                    <p className='text-white text-sm text-center tracking-wider'>
                                        商品を購入する
                                    </p>
                                </div>
                            </div>
                            <div className=' overflow-y-auto bg-gray-100 rounded-md mt-4 p-1'>
                                    {
                                        cart.lineItems.length === 0
                                        ? <p>カート内に商品はありません</p>
                                        : cart.lineItems.map((item: LineItem) => {
                                            return <CartCard key={item.id} product={item} minus={(id) => minusLineItem(id)} plus={(id) => {console.log(id)}}/>
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