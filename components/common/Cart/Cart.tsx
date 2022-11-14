
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
                                    <p className='bg-indigo-100 text-xs text-indigo-600 rounded-md px-2 py-0.5'>あと<span className='text-base font-bold'>¥{8000 - cart.totalPrice}</span>で<span className='text-sm font-bold'>送料無料</span></p>
                                </div>
                                <div className='grid grid-cols-7 items-end justify-between my-3'>
                                    <div className="col-span-5 text-gray-500 text-base font-noto">
                                        合計 <span className="font-sans text-black text-3xl">¥{Math.floor(cart.totalPrice)}</span>
                                    </div>
                                    <div className='col-span-2'>
                                        <p className='text-xs text-end'><span className='text-lg font-semibold'>{cartTotalQuantity()}</span> 点の商品</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mt-1 flex items-center justify-end'>
                                <p className='text-xs text-blue-600 bg-blue-100 w-fit rounded-md px-3 py-1'>送料は次のステップで計算されます</p>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <button className={`bg-gradient-to-tl to-green-600 from-lime-500 shadow-md w-full py-2 rounded-md`} onClick={() => {
                                    if(cart.lineItems.length === 0){
                                        console.log('cart is empty...')
                                    }else{
                                        console.log('in the cart.')
                                    }
                                }}>
                                    <p className='text-white text-lg font-bold text-center tracking-wider'>
                                        商品を購入する
                                    </p>
                                </button>
                            </div>
                            <div className=' overflow-y-auto bg-gray-100 rounded-md my-5 p-1 shadow-sm'>
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